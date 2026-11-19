[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/toirant/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/toirant/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
# news-image-20261119

A make.fun entry: one image summing up the world news of **Thursday 19 November 2026**.

## The entry

`entry.png` is a 1024×1024 newspaper front page, **"THE WORLD IN ONE DAY — THURSDAY 19 NOVEMBER 2026"**, built from the news reported by early 19 November (UTC) — the day's news so far:

- **Lead:** the first-ever U.S.–China–Russia summit opens in Shenzhen (Trump, Xi and Putin)
- Tankers burn after mine strikes east of the Strait of Hormuz; the U.S. strikes Iran's Qeshm Island
- The World Court rules today on Myanmar's alleged Rohingya genocide
- Israeli tanks cross the Gaza ceasefire line
- GTA VI launches worldwide to near-perfect reviews
- A Van Gogh sells for a record $190.4M
- Cyclone Akvan bears down on India (50,000 evacuated in Odisha)
- Also: Pew's projection that Muslims will outnumber Christians by 2035, the Crimean Bridge attacked again, Anthropic's $1.4tn listing, Voyager 1 reaching one light-day from Earth

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to `$MAKEFUN_OUTPUT_DIR/entry.png`. No network, deterministic — two runs write byte-identical bytes.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Source

The front page was composed with Python/PIL from generated illustrations and hand-drawn panels. The compose script and source assets are kept in the build workspace (`news-image-20261119-work/`); this repository holds the finished image and the entry program.

## License

MIT — see `LICENSE`.
