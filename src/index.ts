import axios from "axios";
import { type DataItemCollectionType, Timeline } from "vis-timeline";

const input = document.getElementById("input") as HTMLInputElement;
const image = document.getElementById("image") as HTMLImageElement;
const frame = document.getElementById("frame") as HTMLDivElement;

let timeline: Timeline;

async function render(user: string) {
  timeline?.destroy();
  const items: DataItemCollectionType = [];

  try {
    const basic = await axios.get(`https://api.github.com/users/${user}`);

    image.alt = `${basic.data.name} GitHub Avatar`;
    image.src = basic.data.avatar_url;

    items.push({ content: "Joined GitHub", start: basic.data.created_at, type: "point" });

    const repos = await axios.get(basic.data.repos_url);

    for (const repo of repos.data as Record<"name" | "description" | "created_at" | "pushed_at", string>[]) {
      items.push({ content: repo.name, title: repo.description, start: repo.created_at, end: repo.pushed_at });
    }

    timeline = new Timeline(frame, items, {
      orientation: items.length > 10 ? "both" : "bottom",
      selectable: false,
      showCurrentTime: false,
      zoomKey: "shiftKey",
    });
    image.hidden = false;
  } catch {
    /* empty */
  }
}

input.onchange = () => {
  const user = input.value.trim();

  if (user && /^[-0-9a-zA-Z]{1,39}$/.test(user)) {
    render(user);
  }
};
