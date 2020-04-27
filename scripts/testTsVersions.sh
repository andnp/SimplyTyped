set -e

for v in 3.5.3 next; do
    npm install --no-save typescript@$v
    npm test
done
