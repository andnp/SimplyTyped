set -e

# skip ts 2.9 because of bug with skipLibCheck
for v in 2.8.4 3.0.3 3.1.6 3.2.2 next; do
    npm install --no-save typescript@$v
    npm test
done
