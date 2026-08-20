from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
CAPTURES = ROOT / "captures"
OUTPUT = Path(__file__).resolve().parent / ".artifacts" / "privacy-review"
THUMBNAIL = (920, 540)
LABEL_HEIGHT = 46
SHEET_COLUMNS = 2
SHEET_ROWS = 2


def render_tile(image_path: Path) -> Image.Image:
    source = Image.open(image_path).convert("RGB")
    source.thumbnail(THUMBNAIL)
    tile = Image.new("RGB", (THUMBNAIL[0], THUMBNAIL[1] + LABEL_HEIGHT), "white")
    x = (THUMBNAIL[0] - source.width) // 2
    y = (THUMBNAIL[1] - source.height) // 2
    tile.paste(source, (x, y))
    label = str(image_path.relative_to(CAPTURES))
    ImageDraw.Draw(tile).text((12, THUMBNAIL[1] + 12), label, fill="black", font=ImageFont.load_default())
    return tile


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    paths = sorted(CAPTURES.rglob("*.png"))
    per_sheet = SHEET_COLUMNS * SHEET_ROWS
    for sheet_index, start in enumerate(range(0, len(paths), per_sheet), start=1):
        sheet = Image.new(
            "RGB",
            (THUMBNAIL[0] * SHEET_COLUMNS, (THUMBNAIL[1] + LABEL_HEIGHT) * SHEET_ROWS),
            "#d9d9d9",
        )
        for offset, image_path in enumerate(paths[start : start + per_sheet]):
            tile = render_tile(image_path)
            column = offset % SHEET_COLUMNS
            row = offset // SHEET_COLUMNS
            sheet.paste(tile, (column * tile.width, row * tile.height))
        sheet.save(OUTPUT / f"privacy-review-{sheet_index:02d}.png", optimize=True)


if __name__ == "__main__":
    main()
