---
date: 
  created: 2025-12-10
categories:
  - Programming
tags:
  - Terminals
  - Bash
---


#  Ghostty backspace behaviour over SSH

Ghostty’s backspace behaviour over SSH comes down to how terminal state and environment are initialised on the remote side. By default, an SSH session inherits some basic environment, but it does not automatically know about Ghostty’s preferred TERM, key sequences, and erase character expectations. Without extra integration, the remote shell may come up with an stty erase that does not match the actual backspace code your terminal sends, so pressing backspace simply moves the cursor or prints control characters instead of deleting. Enabling shell-integration-features = ssh-env nudges SSH to export a richer, Ghostty-aware environment into the remote session, so the server sees the right TERM and related variables and configures line editing in a way that matches what Ghostty is actually sending for backspace and other keys

## Zellij on Ghostty

The moment Zellij enters the picture, there is another translation layer between Ghostty and the remote shell. Your key presses go Ghostty → Zellij → SSH → remote shell, and Zellij has its own ideas about terminal compatibility and key handling. While ssh-env is enough to teach a remote shell about Ghostty, it does not apply once Zellij is effectively acting as the “terminal” from the SSH client’s perspective. From the remote host’s point of view, it is now talking to whatever TERM and key behaviour Zellij presents, not Ghostty directly. That is why a second fix is needed: using ~/.ssh/config (for example by forcing a specific TERM or environment) ensures that the SSH session created from inside Zellij carries consistent terminal metadata to the remote host. In practice, Ghostty’s shell integration makes direct SSH sessions behave, and the SSH config tweak makes the Zellij‑through‑Ghostty path look equally well‑behaved from the cluster’s perspective, so the erase character and backspace semantics finally line up.