#!/usr/bin/env python3
"""Replace KOVA case3 assets from Figma exports and scrub cumulus branding."""
from __future__ import annotations

import os
import shutil
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

Image.MAX_IMAGE_PIXELS = None

BASE = Path("/Users/shibohan/施博瀚")
KOVA = Path("/Users/shibohan/Downloads/KOVA")
CASE3 = BASE / "assets/case3"
CASE3_PUB = BASE / "lithos/public/assets/case3"
TARGET_W = 1400
JPEG_Q = 95


def ensure_dirs() -> None:
    CASE3.mkdir(parents=True, exist_ok=True)
    CASE3_PUB.mkdir(parents=True, exist_ok=True)


def pil_to_bgr(im: Image.Image) -> np.ndarray:
    if im.mode != "RGB":
        im = im.convert("RGB")
    arr = np.array(im)
    return cv2.cvtColor(arr, cv2.COLOR_RGB2BGR)


def bgr_to_pil(img: np.ndarray) -> Image.Image:
    return Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))


def save_jpeg(img: np.ndarray, path: Path) -> None:
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(path, "JPEG", quality=JPEG_Q, optimize=True)


def save_png(img: np.ndarray, path: Path) -> None:
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(path, "PNG", optimize=True)


def resize_width_bgr(img: np.ndarray, width: int = TARGET_W) -> np.ndarray:
    h, w = img.shape[:2]
    nh = int(h * width / w)
    return cv2.resize(img, (width, nh), interpolation=cv2.INTER_LANCZOS4)


def inpaint_mask(img: np.ndarray, mask: np.ndarray, radius: int = 7) -> np.ndarray:
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=2)
    return cv2.inpaint(img, mask, radius, cv2.INPAINT_NS)


def rect_mask(shape, boxes):
    mask = np.zeros(shape[:2], np.uint8)
    for x, y, w, h in boxes:
        mask[y : y + h, x : x + w] = 255
    return mask


def scale_boxes(boxes, sx: float, sy: float | None = None):
    if sy is None:
        sy = sx
    return [(int(x * sx), int(y * sy), int(w * sx), int(h * sy)) for x, y, w, h in boxes]


def remove_brown_box_logos(img: np.ndarray, y0: int, y1: int) -> np.ndarray:
    section = img[y0:y1].copy()
    gray = cv2.cvtColor(section, cv2.COLOR_BGR2GRAY)
    brown = (
        (section[:, :, 2] > 45)
        & (section[:, :, 1] < 155)
        & (section[:, :, 0] < 135)
    )
    light = (gray > 150) & (gray < 245)
    mask = (brown & light).astype(np.uint8) * 255
    mask = cv2.dilate(mask, np.ones((7, 7), np.uint8), iterations=2)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    section = cv2.inpaint(section, mask, 8, cv2.INPAINT_NS)
    img[y0:y1] = section
    return img


def redraw_hero_copy(img: np.ndarray) -> np.ndarray:
    h, w = img.shape[:2]
    text_box = (24, int(h * 0.20), int(w * 0.40), int(h * 0.46))
    x, y, bw, bh = text_box
    mask = np.zeros(img.shape[:2], np.uint8)
    mask[y : y + bh, x : x + bw] = 255
    # also scrub faint ghost copy above headline
    mask[int(h * 0.12) : y + bh, x : x + int(w * 0.46)] = 255
    img = cv2.inpaint(img, mask, 12, cv2.INPAINT_NS)
    pil = bgr_to_pil(img)
    draw = ImageDraw.Draw(pil)
    try:
        font_caps = ImageFont.truetype("/System/Library/Fonts/Supplemental/Helvetica.ttc", 16)
        font_h1 = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 54)
        font_body = ImageFont.truetype("/System/Library/Fonts/Supplemental/Helvetica.ttc", 18)
    except OSError:
        font_caps = font_h1 = font_body = ImageFont.load_default()
    draw.text((x + 10, y + 8), "SUMMER KICKOFF EVENT", fill=(210, 210, 210), font=font_caps)
    draw.text((x + 10, y + 36), "Take up to 25% off", fill=(255, 255, 255), font=font_h1)
    draw.text((x + 10, y + 96), "the KOVA Machine", fill=(255, 255, 255), font=font_h1)
    draw.text(
        (x + 10, y + 158),
        "Cold brew, nitro and cold espresso on demand in under a minute.",
        fill=(210, 210, 210),
        font=font_body,
    )
    draw.text((x + 10, y + 182), "Try it risk-free for 30 days.", fill=(210, 210, 210), font=font_body)
    return pil_to_bgr(pil)


def scrub_machine_heading(img: np.ndarray) -> np.ndarray:
    h, w = img.shape[0], img.shape[1]
    # "The Cumulus Machine" heading band in shop page
    y0, y1 = int(h * 0.075), int(h * 0.095)
    mask = np.zeros(img.shape[:2], np.uint8)
    mask[y0:y1, int(w * 0.04) : int(w * 0.35)] = 255
    img = cv2.inpaint(img, mask, 8, cv2.INPAINT_NS)
    pil = bgr_to_pil(img)
    draw = ImageDraw.Draw(pil)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", 46)
    except OSError:
        font = ImageFont.load_default()
    draw.text((int(w * 0.04), y0 - 6), "The KOVA Machine", fill=(45, 30, 22), font=font)
    return pil_to_bgr(pil)


def remove_orange_label_logos(img: np.ndarray, y0: int, y1: int) -> np.ndarray:
    section = img[y0:y1].copy()
    hsv = cv2.cvtColor(section, cv2.COLOR_BGR2HSV)
    # reddish-orange cumulus wordmark on syrup labels
    lower = np.array([0, 40, 120])
    upper = np.array([25, 255, 255])
    mask1 = cv2.inRange(hsv, lower, upper)
    lower2 = np.array([160, 40, 120])
    upper2 = np.array([180, 255, 255])
    mask2 = cv2.inRange(hsv, lower2, upper2)
    mask = cv2.bitwise_or(mask1, mask2)
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=1)
    section = cv2.inpaint(section, mask, 5, cv2.INPAINT_NS)
    img[y0:y1] = section
    return img


def replace_text_region(img: np.ndarray, box, replacement: str, font_scale=1.0, color=(255, 255, 255)):
    x, y, w, h = box
    patch = img[y : y + h, x : x + w].copy()
    patch = cv2.inpaint(
        patch,
        np.ones((h, w), np.uint8) * 255,
        5,
        cv2.INPAINT_NS,
    )
    img[y : y + h, x : x + w] = patch
    pil = bgr_to_pil(img)
    draw = ImageDraw.Draw(pil)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", int(34 * font_scale))
    except OSError:
        font = ImageFont.load_default()
    draw.text((x, y + int(h * 0.15)), replacement, fill=color, font=font)
    return pil_to_bgr(pil)


def process_home_full() -> np.ndarray:
    src = pil_to_bgr(Image.open(KOVA / "主页.png"))
    img = resize_width_bgr(src)
    sx = TARGET_W / src.shape[1]
    h = img.shape[0]

    # Hero top viewport
    top_h = int(h * 0.14)
    hero = img[:top_h].copy()
    hero = inpaint_mask(
        hero,
        rect_mask(hero.shape, scale_boxes([(0, 0, 3840, 72)], sx)),
    )
    img[:top_h] = redraw_hero_copy(hero)

    # Three brews small labels + link text band
    img = remove_brown_box_logos(img, int(h * 0.18), int(h * 0.28))
    img = inpaint_mask(
        img,
        rect_mask(img.shape, [(int(TARGET_W * 0.04), int(h * 0.255), int(TARGET_W * 0.35), int(h * 0.015))]),
    )

    # Product grid boxes + cans
    img = remove_brown_box_logos(img, int(h * 0.58), int(h * 0.72))

    # Bottom feature headline band
    img = inpaint_mask(
        img,
        rect_mask(
            img.shape,
            [(int(TARGET_W * 0.04), int(h * 0.84), int(TARGET_W * 0.55), int(h * 0.02))],
        ),
    )

    # Footer newsletter + copyright mentions
    img = inpaint_mask(
        img,
        rect_mask(
            img.shape,
            [
                (int(TARGET_W * 0.62), int(h * 0.965), int(TARGET_W * 0.34), int(h * 0.012)),
                (int(TARGET_W * 0.62), int(h * 0.978), int(TARGET_W * 0.34), int(h * 0.010)),
                (int(TARGET_W * 0.04), int(h * 0.992), int(TARGET_W * 0.45), int(h * 0.006)),
            ],
        ),
    )

    # Testimonial body copy patches (approx)
    for box in scale_boxes(
        [
            (120, 3200, 760, 120),
            (980, 3200, 760, 120),
            (1840, 3200, 760, 120),
        ],
        sx,
    ):
        img = inpaint_mask(img, rect_mask(img.shape, [box]))

    return img


def process_shop_full() -> np.ndarray:
    src = pil_to_bgr(Image.open(KOVA / "商城.png"))
    img = resize_width_bgr(src)
    h = img.shape[0]

    img = scrub_machine_heading(img)

    # Coffee capsule grids (multiple sections)
    for y0, y1 in [
        (int(h * 0.16), int(h * 0.28)),
        (int(h * 0.28), int(h * 0.40)),
        (int(h * 0.40), int(h * 0.52)),
    ]:
        img = remove_brown_box_logos(img, y0, y1)

    # Syrups + bundles product renders
    for y0, y1 in [
        (int(h * 0.52), int(h * 0.64)),
        (int(h * 0.64), int(h * 0.76)),
        (int(h * 0.76), int(h * 0.88)),
    ]:
        img = remove_brown_box_logos(img, y0, y1)
        img = remove_orange_label_logos(img, y0, y1)

    # Machine section: hopper logos + Philips baristina on reference hardware
    sx = TARGET_W / src.shape[1]
    img = inpaint_mask(
        img,
        rect_mask(
            img.shape,
            scale_boxes(
                [
                    (900, 1180, 180, 90),
                    (2100, 1180, 180, 90),
                    (400, 3300, 420, 140),  # philips baristina on white machine
                ],
                sx,
            ),
        ),
    )

    # Full-page product render pass
    img = remove_brown_box_logos(img, int(h * 0.12), int(h * 0.90))
    img = remove_orange_label_logos(img, int(h * 0.45), int(h * 0.90))

    return img


def process_pdp_full() -> np.ndarray:
    src = pil_to_bgr(Image.open(KOVA / "下单页.png"))
    img = resize_width_bgr(src)
    sx = TARGET_W / src.shape[1]
    h = img.shape[0]

    # Top promo bar
    img = inpaint_mask(img, rect_mask(img.shape, scale_boxes([(0, 0, 3840, 72)], sx)))

    # "With Cumulus, the possibilities..." block
    img = inpaint_mask(
        img,
        rect_mask(img.shape, scale_boxes([(120, 5200, 1700, 120)], sx)),
    )

    # Review mentioning cumulus
    img = inpaint_mask(
        img,
        rect_mask(img.shape, scale_boxes([(980, 6800, 760, 160)], sx)),
    )

    # Footer newsletter mentions
    img = inpaint_mask(
        img,
        rect_mask(
            img.shape,
            [
                (int(TARGET_W * 0.62), int(h * 0.965), int(TARGET_W * 0.34), int(h * 0.012)),
                (int(TARGET_W * 0.62), int(h * 0.978), int(TARGET_W * 0.34), int(h * 0.010)),
            ],
        ),
    )

    return img


def process_home_hero() -> np.ndarray:
    src = pil_to_bgr(Image.open(KOVA / "主页.png"))
    # crop hero viewport from top of homepage export
    crop = src[0 : int(src.shape[0] * 0.14), :]
    img = resize_width_bgr(crop)
    sx = TARGET_W / src.shape[1]

    img = inpaint_mask(img, rect_mask(img.shape, scale_boxes([(0, 0, 3840, 72)], sx)))
    img = redraw_hero_copy(img)
    return img


def process_product_frame(src_name: str) -> np.ndarray:
    src = pil_to_bgr(Image.open(KOVA / src_name))
    crop = src[0 : int(src.shape[0] * 0.62), :]
    img = resize_width_bgr(crop, width=900)
    h, w = img.shape[:2]
    for _ in range(4):
        img = remove_brown_box_logos(img, 0, h)
        img = remove_orange_label_logos(img, 0, h)
    # explicit side-panel wordmarks on box renders
    img = inpaint_mask(
        img,
        rect_mask(
            img.shape,
            [
                (int(w * 0.50), int(h * 0.10), int(w * 0.28), int(h * 0.30)),
                (int(w * 0.06), int(h * 0.48), int(w * 0.18), int(h * 0.14)),
            ],
        ),
    )
    return img


def process_product_capsule_only(crop_name: str) -> np.ndarray:
    src = pil_to_bgr(Image.open(KOVA / crop_name))
    img = resize_width_bgr(src, width=900)
    return img


def copy_png(src: Path, name: str) -> None:
    im = Image.open(src)
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    for d in (CASE3, CASE3_PUB):
        im.save(d / name, "PNG", optimize=True)


def write_pair(name: str, img: np.ndarray, ext: str = "jpg") -> None:
    for d in (CASE3, CASE3_PUB):
        path = d / name
        if ext == "jpg":
            save_jpeg(img, path)
        else:
            save_png(img, path)


def rebuild_cover() -> None:
    hero = cv2.imread(str(CASE3 / "home-hero.jpg"))
    h, w = hero.shape[:2]
    ratio = 16 / 10
    crop_h = h
    crop_w = int(round(crop_h * ratio))
    if crop_w > w:
        crop_w = w
        crop_h = int(round(crop_w / ratio))
    left = max(0, int((w - crop_w) * 0.12))
    top = 0
    out = hero[top : top + crop_h, left : left + crop_w]
    out = cv2.resize(out, (1920, 1200), interpolation=cv2.INTER_LANCZOS4)
    for d in (BASE / "assets", BASE / "lithos/public/assets"):
        save_jpeg(out, d / "work3-kova.png")


def main() -> None:
    ensure_dirs()
    print("Processing home-full...")
    write_pair("home-full.jpg", process_home_full())
    print("Processing shop-full...")
    write_pair("shop-full.jpg", process_shop_full())
    print("Processing pdp-full...")
    write_pair("pdp-full.jpg", process_pdp_full())
    print("Processing home-hero...")
    write_pair("home-hero.jpg", process_home_hero())
    print("Processing cart...")
    cart = resize_width_bgr(pil_to_bgr(Image.open(KOVA / "主页右侧购物车.png")))
    write_pair("cart.jpg", cart)
    print("Processing product shots...")
    write_pair("product-ritual.png", process_product_capsule_only("ritual-medium-crop.png.png"), ext="png")
    write_pair("product-syrup.png", process_product_capsule_only("valor-crop.png.png"), ext="png")
    print("Copying capsule PNGs...")
    copy_png(KOVA / "Capsule_Lucid_front_alpha2.png.png", "cap-lucid.png")
    copy_png(KOVA / "delve-crop.png.png", "cap-delve.png")
    copy_png(KOVA / "ritual-medium-crop.png.png", "cap-ritual.png")
    copy_png(KOVA / "valor-crop.png.png", "cap-valor.png")
    print("Copying review card...")
    review = resize_width_bgr(pil_to_bgr(Image.open(KOVA / "Group 5.png")), width=720)
    write_pair("review.png", review, ext="png")
    print("Rebuilding portfolio cover...")
    rebuild_cover()
    print("Done.")


if __name__ == "__main__":
    main()
