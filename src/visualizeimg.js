//This is the code to get the visualization from an ipynb file and display it as an image in our browser

export async function getNotebookImageSrc() {
    const response = await fetch("path/to/your/ipynb/file.ipynb");
    const data = await response.json();
    const image = data["outputs"].find(
        (output) => output["output_type"] === "display_data"
    )["data"]["image/png"];
    return "data:image/png;base64," + image;
}