npm run doc
CHANGED=$(git status 'README.md' --porcelain)
if [ -n "${CHANGED}" ]; then
    git add README.md
    git commit -m "docs: generate documentation"
fi
