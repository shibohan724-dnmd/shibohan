#!/usr/bin/env python3
"""Copy KOVA Figma exports into case3 assets — resize only, no retouching."""
from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np
from PIL import Image

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


def resize_width(img: np.ndarray, width: int) -> np.ndarray:
    h, w = img.shape[:2]
    nh = int(h * width / w)
    return cv2.resize(img, (width, nh), interpolation=cv2.INTER_LANCZOS4)


def save_jpeg(img: np.ndarray, path: Path) -> None:
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(path, "JPEG", quality=JPEG_Q, optimize=True)


def save_png(img: np.ndarray, path: Path) -> None:
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(path, "PNG", optimize=True)


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


def main() -> None:
    CASE3.mkdir(parents=True, exist_ok=True)
    CASE3_PUB.mkdir(parents=True, exist_ok=True)

    home = resize_width(pil_to_bgr(Image.open(KOVA / "主页.png")), TARGET_W)
    write_pair("home-full.jpg", home)

    write_pair("shop-full.jpg", resize_width(pil_to_bgr(Image.open(KOVA / "商城.png")), TARGET_W))
    write_pair("pdp-full.jpg", resize_width(pil_to_bgr(Image.open(KOVA / "下单页.png")), TARGET_W))

    hero_crop = home[: int(home.shape[0] * 0.14), :]
    write_pair("home-hero.jpg", hero_crop)

    write_pair("cart.jpg", resize_width(pil_to_bgr(Image.open(KOVA / "主页右侧购物车.png")), TARGET_W))

    write_pair(
        "product-ritual.png",
        resize_width(pil_to_bgr(Image.open(KOVA / "ritual-medium-crop.png.png")), 900),
        ext="png",
    )
    write_pair(
        "product-syrup.png",
        resize_width(pil_to_bgr(Image.open(KOVA / "valor-crop.png.png")), 900),
        ext="png",
    )

    copy_png(KOVA / "Capsule_Lucid_front_alpha2.png.png", "cap-lucid.png")
    copy_png(KOVA / "delve-crop.png.png", "cap-delve.png")
    copy_png(KOVA / "ritual-medium-crop.png.png", "cap-ritual.png")
    copy_png(KOVA / "valor-crop.png.png", "cap-valor.png")

    write_pair(
        "review.png",
        resize_width(pil_to_bgr(Image.open(KOVA / "Group 5.png")), 720),
        ext="png",
    )

    rebuild_cover()
    print("KOVA assets copied (resize only).")


if __name__ == "__main__":
    main()
