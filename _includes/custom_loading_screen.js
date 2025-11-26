
class CustomLoadingScreen {
    constructor(loadingUIText, loadingUIBackgroundColor, loadingUITextColor) {
        this.loadingUIText = loadingUIText || "Loading...";
        this.loadingUIBackgroundColor = loadingUIBackgroundColor || "black";
        this.loadingUITextColor = loadingUITextColor || "white";
    }

    displayLoadingUI() {
        var loadingDiv = document.createElement("div");
        loadingDiv.id = "customLoadingScreen";
        loadingDiv.style.position = "absolute";
        loadingDiv.style.top = "0";
        loadingDiv.style.left = "0";
        loadingDiv.style.width = "100%";
        loadingDiv.style.height = "100%";
        loadingDiv.style.backgroundColor = this.loadingUIBackgroundColor;
        loadingDiv.style.color = this.loadingUITextColor;
        loadingDiv.style.fontSize = "30px";
        loadingDiv.style.display = "flex";
        loadingDiv.style.justifyContent = "center";
        loadingDiv.style.alignItems = "center";
        loadingDiv.style.zIndex = "2001";
        loadingDiv.innerHTML = this.loadingUIText;
        document.body.appendChild(loadingDiv);
        this._loadingDiv = loadingDiv;
    }

    hideLoadingUI() {
        if (this._loadingDiv) {
            this._loadingDiv.parentNode.removeChild(this._loadingDiv);
            this._loadingDiv = null;
        }
    }
}
