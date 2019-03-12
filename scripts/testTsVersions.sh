set -e

for v in 3.0.3 3.1.6 3.2.2 next; do
    npm install --no-save typescript@$v
    npm test
done
