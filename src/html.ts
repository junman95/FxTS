import { fx } from "./Lazy";

type HtmlDisplayable = string | number | boolean;

/**
 * Returns the HTML string by interpolating the template string with the provided data.
 *
 * corresponding to the `html` function in fxjs.
 *
 * @example
 * ```ts
 * html`<div>${"Hello, World!"}</div>`; // <div>Hello, World!</div>
 *```
 *
 * ```ts
 * const query1 = 'Hello';
 * const query2 = true ? 'World' : 'Bye';
 * const name = 'fxjs';
 * const func = () => 'im function';
 * html`<div>
 *   <span> ${query1}</span>
 *   <span> ${query2}</span>
 *   <span> ${name} </span>
 *   <span> ${func()} </span>
 *   <span> ${false} </span>
 * </div>`
 *
 *```
 */
function html<T extends TemplateStringsArray>(
  strs: T,
  ...datas: HtmlDisplayable[]
): string {
  if (!strs.length) return "";

  const datasIterator = datas[Symbol.iterator]();

  return fx(strs)
    .reduce((res, str) => {
      const { done, value } = datasIterator.next();
      return `${res}${str}${done ? "" : value}`;
    }, "")
    .trim();
}

export default html;
