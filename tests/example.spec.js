import { test, expect } from "@playwright/test";
import { waitFor } from "@testing-library/react";

test("has title", async ({ page }) => {
await page.goto("http://localhost:3000/");
await page.getByRole("heading", { name: "Draggable Tree" });
await page.locator("#addNode").fill("Node 5");
await page.waitForTimeout(5000);
await page.locator("#addingNode").click();
  // await page.getByText("Node 5");
await page.locator("#7").filter({
    hasText: "Node 5",
});

await page.waitForTimeout(5000);
// await page.locator("//div[@id='root'] //div[@id='3']//i[@id='3']").click();
// await page.locator("#editNode").fill("Node 3");
// await page.locator("#editingNode").click();
// await page.waitForTimeout(5000);
// await page.locator("//div[@id='root'] //div[@id='2']//i[@id='1-1']").click();
// await page.waitForTimeout(5000);
await page.locator("//div[@id='root'] //div[@id='4']//span[text()='Node 2']").dragTo(page.locator( "//div[@id='root']//div[@id='1']//span[text()='Node 1']"));
await page.waitForTimeout(5000);

});
