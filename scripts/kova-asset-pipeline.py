#!/usr/bin/env python3
"""KOVA case3 assets from Figma exports — only erase small cumulus wordmarks."""
from __future__ import annotations

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


def pil_to_bgr(im: Image.Image) -> np.ndarray:
    if im.mode != "RGB":
        im = im.convert("RGB")
    return cv2.cvtColor(np.array(im), cv2.COLOR_RGB2BGR)


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


def inpaint_small(img: np.ndarray, mask: np.ndarray, radius: int = 3) -> np.ndarray:
    if mask.max() == 0:
        return img
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=1)
    return cv2.inpaint(img, mask, radius, cv2.INPAINT_TELEA)


def component_mask(
    section: np.ndarray,
    pixel_cond: np.ndarray,
    min_area: int,
    max_area: int,
    max_w: int,
    max_h: int,
) -> np.ndarray:
    """Mask only small connected regions (wordmark-sized), not whole product faces."""
    binary = (pixel_cond.astype(np.uint8) * 255)
    binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, np.ones((2, 2), np.uint8))
    n, labels, stats, _ = cv2.connectedComponentsWithStats(binary, connectivity=8)
    mask = np.zeros(section.shape[:2], np.uint8)
    for i in range(1, n):
        area = stats[i, cv2.CC_STAT_AREA]
        w = stats[i, cv2.CC_STAT_WIDTH]
        h = stats[i, cv2.CC_STAT_HEIGHT]
        if min_area <= area <= max_area and w <= max_w and h <= max_h:
            mask[labels == i] = 255
    return mask


def erase_product_grid_logos(
    img: np.ndarray,
    y0: int,
    y1: int,
    rows: int = 2,
    cols: int = 3,
) -> np.ndarray:
    """Erase cumulus on box sides + small can labels within product photo cells."""
    w = img.shape[1]
    col_w = w // cols
    band_h = (y1 - y0) // rows
    boxes: list[tuple[int, int, int, int]] = []
    for r in range(rows):
        for c in range(cols):
            x0 = c * col_w
            cy = y0 + r * band_h + int(band_h * 0.38)
            # brown box side wordmark — tight strip on right face only
            boxes.append((x0 + int(col_w * 0.62), cy, int(col_w * 0.16), int(band_h * 0.06)))
            # small logo on standalone can label
            boxes.append((x0 + int(col_w * 0.08), cy + int(band_h * 0.24), int(col_w * 0.14), int(band_h * 0.05)))
            # cans inside box
            boxes.append((x0 + int(col_w * 0.40), cy + int(band_h * 0.12), int(col_w * 0.10), int(band_h * 0.05)))
    return erase_boxes(img, boxes)


def stamp_patch(img: np.ndarray, x: int, y: int, w: int, h: int, offset_up: int) -> None:
    y_src = y - offset_up - h
    if y_src < 0:
        return
    img[y : y + h, x : x + w] = img[y_src : y_src + h, x : x + w]


def erase_tumbler_logos(img: np.ndarray, y0: int, y1: int, cols: int = 3) -> np.ndarray:
    w = img.shape[1]
    col_w = w // cols
    band = y1 - y0
    for c in range(cols):
        x0 = c * col_w
        col = img[y0:y1, x0 : x0 + col_w].copy()
        gray = cv2.cvtColor(col, cv2.COLOR_BGR2GRAY)
        photo_h = int(band * 0.62)
        mask = np.zeros(col.shape[:2], np.uint8)
        for y in range(photo_h):
            row = gray[y]
            if row.mean() > 205 and row.min() < 135:
                mask[y, row < 135] = 255
        col = inpaint_small(col, mask, radius=2)
        img[y0:y1, x0 : x0 + col_w] = col
    return img


def erase_cumulus_wordmarks(section: np.ndarray) -> np.ndarray:
    """Orange cumulus on syrup bottle labels only (small components)."""
    gray = cv2.cvtColor(section, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(section, cv2.COLOR_BGR2HSV)
    orange = cv2.inRange(hsv, np.array([0, 50, 100]), np.array([28, 255, 255]))
    orange |= cv2.inRange(hsv, np.array([160, 50, 100]), np.array([180, 255, 255]))
    orange_on_label = orange & (gray > 90)
    mask = component_mask(section, orange_on_label, min_area=40, max_area=2200, max_w=85, max_h=28)
    return inpaint_small(section, mask, radius=3)


def scrub_shop_page(img: np.ndarray) -> np.ndarray:
    h = img.shape[0]
    # coffee capsule grids (product photos only)
    for y0, y1, rows in [
        (int(h * 0.16), int(h * 0.28), 2),
        (int(h * 0.28), int(h * 0.40), 2),
        (int(h * 0.40), int(h * 0.52), 2),
    ]:
        img = erase_product_grid_logos(img, y0, y1, rows=rows, cols=3)
    # bundles + syrups product rows
    for y0, y1 in [
        (int(h * 0.52), int(h * 0.64)),
        (int(h * 0.64), int(h * 0.76)),
    ]:
        img = erase_product_grid_logos(img, y0, y1, rows=2, cols=3)
        section = img[y0:y1].copy()
        section = erase_cumulus_wordmarks(section)
        img[y0:y1] = section
    # tumblers
    img = erase_tumbler_logos(img, int(h * 0.76), int(h * 0.86), cols=3)
    return img


def scrub_home_page(img: np.ndarray) -> np.ndarray:
    h = img.shape[0]
    img = erase_product_grid_logos(img, int(h * 0.58), int(h * 0.72), rows=2, cols=3)
    return img


def erase_boxes(img: np.ndarray, boxes: list[tuple[int, int, int, int]]) -> np.ndarray:
    for x, y, w, h in boxes:
        if x - w > 0:
            img[y : y + h, x : x + w] = img[y : y + h, x - w : x]
        else:
            mask = np.zeros(img.shape[:2], np.uint8)
            mask[y : y + h, x : x + w] = 255
            img = inpaint_small(img, mask, radius=3)
    return img


def scale_boxes(boxes, sx: float, sy: float | None = None):
    if sy is None:
        sy = sx
    return [(int(x * sx), int(y * sy), int(w * sx), int(h * sy)) for x, y, w, h in boxes]


def patch_hero_cumulus_word(img: np.ndarray, sx: float) -> np.ndarray:
    """Only replace the word Cumulus in hero headline — rest of image untouched."""
    # source coords on 3840px-wide 主页.png hero
    boxes = scale_boxes([(118, 1180, 520, 110)], sx)
    img = erase_boxes(img, boxes)
    pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(pil)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", int(54 * sx))
    except OSError:
        font = ImageFont.load_default()
    x, y, _, _ = boxes[0]
    draw.text((x, y + int(8 * sx)), "KOVA", fill=(255, 255, 255), font=font)
    return cv2.cvtColor(np.array(pil), cv2.COLOR_RGB2BGR)


def patch_shop_machine_title(img: np.ndarray, sx: float) -> np.ndarray:
    boxes = scale_boxes([(150, 1980, 620, 90)], sx)
    img = erase_boxes(img, boxes)
    pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(pil)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Georgia.ttf", int(46 * sx))
    except OSError:
        font = ImageFont.load_default()
    x, y, _, _ = boxes[0]
    draw.text((x, y), "The KOVA Machine", fill=(45, 30, 22), font=font)
    return cv2.cvtColor(np.array(pil), cv2.COLOR_RGB2BGR)


def scrub_page_logos(img: np.ndarray, mode: str = "home") -> np.ndarray:
    if mode == "shop":
        return scrub_shop_page(img)
    return scrub_home_page(img)


def write_pair(name: str, img: np.ndarray, ext: str = "jpg") -> None:
    for d in (CASE3, CASE3_PUB):
        path = d / name
        if ext == "jpg":
            save_jpeg(img, path)
        else:
            save_png(img, path)


def copy_png(src: Path, name: str) -> None:
    im = Image.open(src)
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    for d in (CASE3, CASE3_PUB):
        im.save(d / name, "PNG", optimize=True)


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
    out = hero[0:crop_h, left : left + crop_w]
    out = cv2.resize(out, (1920, 1200), interpolation=cv2.INTER_LANCZOS4)
    for d in (BASE / "assets", BASE / "lithos/public/assets"):
        save_jpeg(out, d / "work3-kova.png")


def process_full_page(src_name: str, extra=None, mode: str = "home") -> np.ndarray:
    src = pil_to_bgr(Image.open(KOVA / src_name))
    sx = TARGET_W / src.shape[1]
    img = resize_width_bgr(src)
    img = scrub_page_logos(img, mode=mode)
    if extra:
        img = extra(img, sx)
    return img


def main() -> None:
    CASE3.mkdir(parents=True, exist_ok=True)
    CASE3_PUB.mkdir(parents=True, exist_ok=True)

    print("home-full (resize + small logo erase only)...")
    write_pair("home-full.jpg", process_full_page("主页.png", patch_hero_cumulus_word, mode="home"))

    print("shop-full...")
    write_pair("shop-full.jpg", process_full_page("商城.png", patch_shop_machine_title, mode="shop"))

    print("pdp-full...")
    write_pair("pdp-full.jpg", process_full_page("下单页.png", mode="home"))

    print("home-hero...")
    src = pil_to_bgr(Image.open(KOVA / "主页.png"))
    sx = TARGET_W / src.shape[1]
    crop = src[0 : int(src.shape[0] * 0.14), :]
    hero = resize_width_bgr(crop)
    hero = patch_hero_cumulus_word(hero, sx)
    write_pair("home-hero.jpg", hero)

    print("cart (direct copy)...")
    write_pair("cart.jpg", resize_width_bgr(pil_to_bgr(Image.open(KOVA / "主页右侧购物车.png"))))

    print("product shots (direct copy, no processing)...")
    for src_name, out_name in [
        ("ritual-medium-crop.png.png", "product-ritual.png"),
        ("valor-crop.png.png", "product-syrup.png"),
    ]:
        im = resize_width_bgr(pil_to_bgr(Image.open(KOVA / src_name)), width=900)
        write_pair(out_name, im, ext="png")

    print("capsules (direct copy)...")
    copy_png(KOVA / "Capsule_Lucid_front_alpha2.png.png", "cap-lucid.png")
    copy_png(KOVA / "delve-crop.png.png", "cap-delve.png")
    copy_png(KOVA / "ritual-medium-crop.png.png", "cap-ritual.png")
    copy_png(KOVA / "valor-crop.png.png", "cap-valor.png")

    print("review (direct copy)...")
    write_pair(
        "review.png",
        resize_width_bgr(pil_to_bgr(Image.open(KOVA / "Group 5.png")), width=720),
        ext="png",
    )

    print("portfolio cover...")
    rebuild_cover()
    print("Done.")


if __name__ == "__main__":
    main()
