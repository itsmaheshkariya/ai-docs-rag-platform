#!/bin/bash

# Setup GitHub SSH for Mahesh 🚀

# 1. Generate SSH key
ssh-keygen -t ed25519 -C "itsmaheshkariya@gmail.com" -f ~/.ssh/id_ed25519 -N ""

# 2. Start ssh-agent
eval "$(ssh-agent -s)"

# 3. Add SSH key
ssh-add ~/.ssh/id_ed25519

# 4. Set global Git username and email
git config --global user.name "itsmaheshkariya"
git config --global user.email "itsmaheshkariya@gmail.com"

# 5. Display the SSH public key
echo "🎯 Copy this SSH key and add it to GitHub:"
cat ~/.ssh/id_ed25519.pub

echo "✅ Setup complete! Go to GitHub > Settings > SSH and GPG keys > New SSH key"
