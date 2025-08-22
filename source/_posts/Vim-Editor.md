---
title: Vim Editor
date: 2024-06-11 10:07:02
tags: vim
categories:
- CS
- tools
---
*This notes is according to MIT's course: missing-semester: Editors(Vim)*

## Vim

Vim is a command line based code editor, designed for programmers and designed by programmers. And other visual editors like VS Code can also integrate **vim** mode for advanced coding experience.

The core philosophy of **vim** editor is command, all operations are done by typing keys, using without mouse. After being familiar with these key settings, the speed of programming can be extremely improved.

## Modes of vim

**Vim** contains several operating modes for different using:

- Normal: navigating, moving, and simple editing. Press `ESC` for back to normal mode.
- Insert: inserting text. Press `i` for switching to **insert** mode.
- Replace: replacing text. Press `shift-r` for switching to **replace** mode.
- Visual:
  - Visual-plain: selecting text by cursor movement. Press `v`.
  - Visual-line: selecting text by line. Press `shift-v`.
  - Visual-block: selecting text by block. Press `ctrl-v`.
- Command-line: running command. Press `shift-;`.

## Command-line

By pressing `:` to get into command-line mode, where can send command to operating thw vim in a whole.

- `:q` | quit (or close current window).
- `:w` | write and save.
- `:wq` | save and quit.
- `:e {filename}` | open file and edit.
- `:ls` | show open buffers.
- `:help {topic}` | open help
  - `:help :w` | help info for command `:w`.
  - `:help w` | help info for command `w`.

## Cursor movement

- Basic movement: `hjkl` | left, down, up, right.
- Move by word: `w, b, e` | next word, beginning of word, end of word.
- Move by line: `0, ^, $` | beginning of line, first non-blank character, end of line.
- Move by screen: `H, M, L` | top of screen, middle of screen, bottom of screen.
- Scroll: `ctrl-u, ctrl-d` | scroll up, scroll down.
- Move by file: `gg, G` | beginning of file, end of file.
- Misc: `%` | corresponding item.
- Find: `f{char}, t{char}, F{char}, T{char}` | find\to forward\backward character on the current line.
- Search: `/{regex}, n, N` | navigating match items.

## Edits

- `i` | enter insert mode.
- `o, O` | insert line below, insert line above.
- `d{motion}` | delete by motion command.
  - `dw` | delete word.
  - `d$` | delete to end of line.
  - `d0` | delete to beginning of line.
- `c{motion}` | change by motion command.
- `x` | delete character.
- `s` | substitute character.
- `u` | undo.
- `ctrl-r` | redo.
- `y` | copy
- `p` | paste.

## Counts

By using command pattern `{number}{command}` can do this command by times.

- `3w` move 3 words forward.
- `5j` move 5 lines down.
- `7dw` delete 7 words.

## Modifiers

While using *delete* or *change* command, add `i` or `a` can specify the command is done inside or around.

- `ci(` | change content inside current pair of parentheses.
- `ci[` | change content inside current pair of square brackets.
- `da'` | delete a single-quoted string, including the surrounding single quotes.
