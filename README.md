# Adelite

There are so much repositories that we star across platforms like GitHub, GitLab, or even [Codeberg](https://codeberg.org/)!
Then, we use some of the projects that we star, self-hosted it, and we eventually lost in space, we don't update our hosted version
because we don't know if there's any new releases and we hardly keep tabs of things.

Getting notification from multiple Git platforms would make our email (or at least, notifications) to be spammy. Don't we just
want the latest release by the end of the day.... or by the end of the week? As honestly, most people update their hosted version
of applications on a monthly basis at most.

Adelite is meant for solving that problem, helping you to keep tabs on projects you use. A non-invasive release notification aggregator
for repositories that you actually care.

## Usage

There is no usage guide for this one, as Adelite is still on development.

But eventually, we provide a few ways:

### From official Docker image

```sh
docker run ghcr.io/teknologi-umum/adelite
```

### Build the Docker image yourself

```sh
git clone https://github.com/teknologi-umum/adelite.git
docker build -t adelite:latest .
docker run adelite:latest
```

### Build from source

```sh
git clone https://github.com/teknologi-umum/adelite.git
# Make sure you've installed Node.js
npm install --location=global pnpm
pnpm install
pnpm run build
node ./dist/index.js
```

More on the guide later!

## License

```
Adelite is a non-invasive release notification aggregator for repositories that you actually care.
Copyright (C) 2023-present  Teknologi Umum <opensource@teknologiumum.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

See [LICENSE](./LICENSE)