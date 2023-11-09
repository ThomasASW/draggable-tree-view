import { test, expect } from "@playwright/test";
import { waitFor } from "@testing-library/react";

test("has title", async ({ page }) => {
  const addedNode=page.locator("//div[@id='root'] //div[@id='Node 11']//span[text()='Node 11']");
  const editedNode=page.locator("//div[@id='root'] //div[@id='Node 12']//span[text()='Node 12']");
  const deletedNode=page.locator("//div[@id='root'] //div[@id='Node 6']//span[text()='Node 6']");
await page.goto("http://localhost:3000/");
await page.getByRole("heading", { name: "Draggable Tree" });
await page.locator("#addNode").fill("Node 11");
await page.waitForTimeout(5000);
await page.locator("#addingNode").click();

// await page.locator("#7").filter({
//     hasText: "Node 5",
// });
await expect(addedNode).toBeVisible();
await page.waitForTimeout(5000);
await page.locator("//div[@id='root'] //div[@id='Node 4']//i[@id='Node 4edit']").click();
await page.locator("#editNode").fill("Node 12");
await page.locator("#editingNode").click();
await expect(editedNode).toBeVisible();
await page.waitForTimeout(5000);
await page.locator("//div[@id='root'] //div[@id='Node 6']//i[@id='Node 6del']").click();
await expect(deletedNode).not.toBeVisible();
await page.waitForTimeout(5000);
await page.locator("//div[@id='root'] //div[@id='Node 12']//span[text()='Node 12']").dragTo(page.locator( "//div[@id='root']//div[@id='Node 1']//span[text()='Node 1']"));
await page.waitForTimeout(5000);

});
