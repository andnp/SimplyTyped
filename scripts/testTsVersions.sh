set -e

# highest patch version of each minor version
for v in 3.0.3 3.1.6 3.2.4 3.3.4000 3.4.5 3.5.3 3.6.5 3.7.5 3.8.3 next; do
    npm install --no-save typescript@$v
    npm test
done
