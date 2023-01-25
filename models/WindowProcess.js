import Drag from "/models/Drag.js";

const main = document.querySelector("main");

export default class WindowProcess {
	static allProcess = [];
	static minimizeProcessEvent = new CustomEvent("minimizeprocess");
	static maximizeProcessEvent = new CustomEvent("maximizeprocess");
	static removeProcessEvent = new CustomEvent("removeprocess");
	static createProcessEvent = new CustomEvent("createprocess");
	static toggleVisibleEvent = new CustomEvent("togglevisible");

	static onMinimizeProcess() {
		document.addEventListener("minimizeprocess", (e) => {
			let element = e.data.element;

			//  document.dispatchEvent(this.eventMinimize);
			element.style.visibility = "hidden";
		});
	}

	static onToggleVisible() {
		document.addEventListener("togglevisible", (e) => {
			let element = document.querySelector(`[data-process-id='${e.data.processId}']`);

			this.allProcess.forEach((window) => (window.element.style.zIndex = 0));

			if (element.style.visibility == "hidden") {
				element.style.visibility = "visible";
				element.style.zIndex = 1;
			} else {
				element.style.visibility = "hidden";
			}
		});
	}
	static onMaximizeProcess() {
		document.addEventListener("maximizeprocess", (e) => {
			let element = e.data.element;

			element.classList.remove("transform-none");

			element.style.left = `inherit`;
			element.style.top = `inherit`;

			if (element.classList.contains("window--lg")) {
				if (e.data.display == "md") {
					element.className = "window window--md window--round ";
				} else {
					element.className = "window window--sm window--round ";
				}
			} else {
				element.style.transform = "inherit";
				element.style.left = `0px`;
				element.style.top = `0px`;
				element.className = "window window--lg";
			}
		});
	}
	static onRemoveProcess() {
		document.addEventListener("removeprocess", (e) => {
			let elements = document.querySelectorAll(`*[data-process-id='${e.data.processId}']`);
			elements.forEach((el) => {
				el.remove();
			});
			this.removeProcess(e.data.processId);
		});
	}

	static startProcessesListeners() {
		this.onMaximizeProcess();
		this.onMinimizeProcess();
		this.onRemoveProcess();
		this.onToggleVisible();
	}

	static getClassWindowProcess(display) {
		let windowClass = "window--round ";
		switch (display) {
			case "xs":
				windowClass += "window--xs";
				break;
			case "sm":
				windowClass += "window--sm";
				break;
			case "md":
				windowClass += "window--md";
				break;
			case "lg":
				windowClass = "window--lg";
				break;
			default:
				windowClass += "window--default";
				break;
		}
		return windowClass;
	}

	static createWindowElement(iframeUrl, display = "", image, processId, noResizable, width, height) {
		let windowClass = this.getClassWindowProcess(display);

		let div = document.createElement("div");
		let divActions = document.createElement("div");
		let maximizeIcon = document.createElement("img");
		let minimizeIcon = document.createElement("img");
		let closeIcon = document.createElement("img");
		let iframe = document.createElement("iframe");

		let processObj = { image: image, page: iframeUrl, processId, element: div, display };

		maximizeIcon.src = "/assets/icons/square.png";
		maximizeIcon.addEventListener("click", () => {
			this.maximizeProcessEvent.data = processObj;
			document.dispatchEvent(this.maximizeProcessEvent);
		});
		maximizeIcon.alt = "maximize";
		if (noResizable) {
			maximizeIcon.style.pointerEvents = "none";
			maximizeIcon.disabled = true;
			maximizeIcon.title = "No resizable";
		}

		minimizeIcon.src = "/assets/icons/minimize.png";
		minimizeIcon.alt = "minimize";
		minimizeIcon.addEventListener("click", () => {
			this.minimizeProcessEvent.data = processObj;
			document.dispatchEvent(this.minimizeProcessEvent);
		});

		closeIcon.src = "/assets/icons/close.png";
		closeIcon.className = "--close";
		closeIcon.alt = "close";
		closeIcon.addEventListener("click", () => {
			this.removeProcessEvent.data = processObj;
			document.dispatchEvent(this.removeProcessEvent);
		});

		divActions.className = "window__actions";

		divActions.append(minimizeIcon, maximizeIcon, closeIcon);

		iframe.className = "window__iframe";
		iframe.src = `${iframeUrl}`;
		iframe.frameborder = 0;
		iframe.prompt = "title";

		div.className = `window ${windowClass}`;
		div.tabIndex = "0";

		// if (width && height) {
		//   div.style.maxWidth = width || div.width;
		//   div.style.maxHeight = height || div.height;
		// }

		div.dataset.processId = processObj.processId;
		div.append(divActions, iframe);

		Drag.addDragEventToElement(divActions);

		main.appendChild(div);

		return processObj;
	}
	static createProcess(iframeUrl, display, image, noResizable, width, height) {
		if (this.allProcess.find((process) => process.page == iframeUrl)) return;

		let processId = "process" + (this.allProcess.length + 1);

		let processObj = this.createWindowElement(iframeUrl, display, image, processId, noResizable, width, height);

		this.createProcessEvent.data = processObj;
		document.dispatchEvent(this.createProcessEvent);
		this.allProcess.push(processObj);
	}

	static removeProcess(processId) {
		let indexOfProcess = this.allProcess.indexOf((process) => process.processId == processId);
		this.allProcess.splice(indexOfProcess, 1);
	}
}
