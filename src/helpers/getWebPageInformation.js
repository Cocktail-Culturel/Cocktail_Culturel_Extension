import waitForElement from "~/helpers/waitForElement";
import config from "~/config.json";
import { trailingCommaPHP } from "@prettier/plugin-php/src/options";

export default function getWebPageInformation() {
  return new Promise(async (resolve) => {
    const configChannel = config.selectors.watch.channel;
    const configTitle = config.selectors.watch.title;
    let keywords = [];
    let channel = "";
    if (configChannel.indexOf("::") != -1) {
      // an attribute to read
      const [selector, attribute] = configChannel.split("::");
      const $el = await waitForElement(selector);
      channel = $el.getAttribute(attribute);
    } else {
      const $el = await waitForElement(configChannel);
      channel = $el.innerText;
    }
    let words = channel.split(" ");
    words
      .filter((item) => item.length >= 3)
      .forEach((e) => {
        keywords.push(e);
      });
    let title = "";
    if (configTitle.indexOf("::") != -1) {
      // an attribute to read
      const [selector, attribute] = configTitle.split("::");
      const $el = await waitForElement(selector);
      title = $el.getAttribute(attribute);
    } else {
      const $el = await waitForElement(configTitle);
      title = $el.innerText;
    }
    // title treatment
    words = title.split(" ");
    words
      .filter((item) => item.length >= 3)
      .forEach((e) => {
        keywords.push(e);
      });
    keywords = keywords.map((e) => e.trim());
    resolve(
      keywords.sort().filter(function (item, pos, ary) {
        return !pos || item != ary[pos - 1];
      })
    );
  });
}
