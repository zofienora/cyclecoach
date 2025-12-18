import os
import time
import sys
import random

# ANSI escape codes
GREEN = "\033[32m"
YELLOW = "\033[33m"
RED = "\033[31m"
BLUE = "\033[34m"
MAGENTA = "\033[35m"
CYAN = "\033[36m"
RESET = "\033[0m"

ORNAMENT_COLORS = [YELLOW, RED, BLUE, MAGENTA, CYAN]

TREE = [
    "        ^        ",
    "       ^^^       ",
    "      ^^^^^      ",
    "     ^^^^^^^     ",
    "    ^^^^^^^^^    ",
    "   ^^^^^^^^^^^   ",
    "  ^^^^^^^^^^^^^  ",
    "        ||       ",
    "        ||       ",
]

def clear():
    # Works in most terminals (including macOS)
    os.system("clear" if os.name != "nt" else "cls")

def colored_tree(blink_on: bool) -> str:
    lines = []
    for i, row in enumerate(TREE):
        line_chars = list(row)
        for j, ch in enumerate(line_chars):
            if ch == "^":
                # Random ornaments on tree
                if random.random() < 0.15:
                    color = random.choice(ORNAMENT_COLORS)
                    line_chars[j] = color + "o" + RESET
                else:
                    line_chars[j] = GREEN + "^" + RESET
            elif ch == "|":
                line_chars[j] = YELLOW + "|" + RESET
        lines.append("".join(line_chars))

    # Add blinking star at the top
    star_color = YELLOW if blink_on else RESET
    star = f"        {star_color}*{RESET}        "
    return "\n".join([star] + lines)

def main():
    try:
        blink_on = True
        while True:
            clear()
            sys.stdout.write(colored_tree(blink_on) + "\n")
            sys.stdout.flush()
            blink_on = not blink_on
            time.sleep(0.5)
    except KeyboardInterrupt:
        clear()
        print("Merry Christmas! 🎄")

if __name__ == "__main__":
    main()

