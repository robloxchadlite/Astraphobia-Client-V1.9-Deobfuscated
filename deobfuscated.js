(function() {
    "use strict";

    function f(p) {
        let vLS = "";
        for (let vLN0 = 0; vLN0 < p; vLN0++) {
            const v = Math.floor(Math.random() * 1048575 + 65536);
            vLS += String.fromCodePoint(v);
        }
        return vLS;
    }

    function f2(p2, p3) {
        const v2 = document.querySelector(p2);
        if (!v2) {
            return false;
        }
        v2.focus();
        v2.value = "";
        let vLN02 = 0;
        const vF = () => {
            if (vLN02 >= p3.length) {
                v2.dispatchEvent(new Event("change", {
                    bubbles: true
                }));
                v2.dispatchEvent(new Event("input", {
                    bubbles: true
                }));
                return;
            }
            v2.value += p3[vLN02];
            v2.dispatchEvent(new InputEvent("input", {
                bubbles: true
            }));
            vLN02++;
            setTimeout(vF, 25);
        };
        vF();
        return true;
    }
    let v3 = new WeakMap();

    function f3(p4, p5, p6) {
        const v4 = p4[p5];
        const v5 = new Proxy(v4, p6);
        v3.set(v5, v4);
        p4[p5] = v5;
    }
    let vLS2 = "";
    let vLN03 = 0;

    function f4(p7) {
        const v6 = Date.now();
        if (p7 === vLS2 && v6 - vLN03 < 3000) {
            return;
        }
        vLS2 = p7;
        vLN03 = v6;
        const v7 = document.createElement("div");
        v7.style.cssText = "\n      position: fixed; top: 16px; right: 16px;\n      background: var(--notif-bg, #282828); color: var(--notif-text, #e0e0e0);\n      padding: 10px 16px; border-radius: 4px;\n      z-index: 10000000; font-size: 13px;\n      opacity: 0; transition: opacity 0.2s ease, transform 0.2s ease;\n      pointer-events: none; font-family: 'Segoe UI', system-ui, sans-serif;\n      border-left: 3px solid var(--notif-border, var(--acc, #888));\n      transform: translateX(20px);\n    ";
        v7.textContent = p7;
        document.body.appendChild(v7);
        requestAnimationFrame(() => {
            v7.style.opacity = "1";
            v7.style.transform = "translateX(0)";
        });
        setTimeout(() => {
            v7.style.opacity = "0";
            v7.style.transform = "translateX(20px)";
            setTimeout(() => v7.remove(), 200);
        }, 2500);
    }
    let v8 = false;

    function f5() {
        if (v8) {
            return;
        }
        v8 = true;
        const vA = ["div.ad-block", "a[href*=\"ad\"]", "iframe[src*=\"ads\"], iframe[src*=\"googlead\"]", ".advertisement", "[class*=\"ads\"], [class*=\"ad-\"]", "[id*=\"ad\"], [id*=\"banner\"]", ".sidebar.left > a", ".sidebar.left > div:not(.sidebar-content)", "div.sidebar.left > div:has(> iframe)", "div.sidebar.left > div:has(> a[href*=\"doubleclick\"])"];
        const vF2 = () => {
            vA.forEach(p8 => {
                document.querySelectorAll(p8).forEach(p9 => {
                    p9.style.display = "none";
                    p9.style.opacity = "0";
                    p9.style.pointerEvents = "none";
                    p9.style.visibility = "hidden";
                    p9.removeAttribute("src");
                    p9.remove();
                });
            });
            const v9 = document.querySelector("div.sidebar.left");
            if (v9) {
                v9.style.maxWidth = "30vw";
                v9.style.width = "21rem";
                v9.style.overflow = "hidden";
            }
        };
        vF2();
        new MutationObserver(vF2).observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });
        setInterval(vF2, 5000);
        f4("Ad blocker active");
    }
    let v10 = false;

    function f6() {
        if (v10) {
            return;
        }
        let v11 = localStorage.getItem("autofill_name") || "";
        let v12 = document.querySelector(".name-input input") || document.querySelector(".play-game .el-input__inner");

        function f7() {
            if (v10) {
                return;
            }
            v10 = true;
            v12.value = v11;
            v12.dispatchEvent(new Event("input", {
                bubbles: true
            }));
            v12.addEventListener("input", () => {
                if (v11 !== v12.value) {
                    v11 = v12.value;
                    localStorage.setItem("autofill_name", v11);
                }
            });
        }
        if (v12 == null) {
            const vSetInterval = setInterval(() => {
                v12 = document.querySelector(".name-input input") || document.querySelector(".play-game .el-input__inner");
                if (v12 != null) {
                    clearInterval(vSetInterval);
                    f7();
                }
            }, 200);
        } else {
            f7();
        }
    }
    let v13 = null;
    let v14 = false;

    function f8(p10, p11) {
        if (v13) {
            clearInterval(v13);
        }
        v14 = true;
        v13 = setInterval(() => {
            f10(p10);
        }, p11 * 1000);
    }

    function f9() {
        if (v13) {
            clearInterval(v13);
            v13 = null;
        }
        v14 = false;
    }

    function f10(p12) {
        const v15 = document.querySelector(".chat-input input") || document.querySelector("input[placeholder*=\"chat\" i]") || document.querySelector("input[type=\"text\"]");
        if (!v15) {
            return;
        }
        v15.focus();
        v15.value = "";
        let vLN04 = 0;
        const vF3 = () => {
            if (vLN04 >= p12.length) {
                const v16 = document.querySelector(".chat-input button") || document.querySelector("button[aria-label*=\"send\" i]");
                if (v16) {
                    v16.click();
                } else {
                    v15.dispatchEvent(new Event("change", {
                        bubbles: true
                    }));
                    v15.dispatchEvent(new Event("input", {
                        bubbles: true
                    }));
                    setTimeout(() => {
                        v15.value = "";
                        v15.blur();
                    }, 100);
                }
                return;
            }
            v15.value += p12[vLN04];
            v15.dispatchEvent(new InputEvent("input", {
                bubbles: true
            }));
            vLN04++;
            setTimeout(vF3, 25);
        };
        vF3();
    }
    let v17 = false;

    function f11() {
        if (v17) {
            return;
        }

        function f12(p13) {
            if (typeof p13 !== "string") {
                return p13;
            }
            return p13.replace(/\\(\\|n|r|t|b|f|v|\d{1,3}|x([\da-fA-F]{2})|u([\da-fA-F]{4})|u\{(0*[\da-fA-F]{1,6})\})/g, (p14, p15, p16, p17, p18) => {
                switch (p15[0]) {
                    case "\\":
                        return "\\";
                    case "n":
                        return "\n";
                    case "r":
                        return "\r";
                    case "t":
                        return "\t";
                    case "b":
                        return "\b";
                    case "f":
                        return "\f";
                    case "v":
                        return "";
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                        return String.fromCharCode(Number.parseInt(p15, 8) || 0);
                    default:
                        if (p16 != null) {
                            return String.fromCharCode(Number.parseInt(p16, 16) || 0);
                        }
                        if (p17 != null) {
                            return String.fromCharCode(Number.parseInt(p17, 16) || 0);
                        }
                        if (p18 != null) {
                            const v18 = Number.parseInt(p18, 16) || 0;
                            if (v18 > 1114111) {
                                return p14;
                            } else {
                                return String.fromCodePoint(v18);
                            }
                        }
                        return p15;
                }
            });
        }
        const vO = {
            spawn: 22,
            createTribe: 5,
            chat: 100
        };
        const v19 = TextEncoder.prototype.encode;
        TextEncoder.prototype.encode = function(..._0x53f7ce) {
            try {
                const vA2 = [/^(\x14{3}\d+\|6\|)(.+)$/gm, /^(\x14{3}\d+\|8\|)(.+)$/gm, /^(\x14{3}\d+\|14\|)(.+)$/gm, /^(\x13{3}[01])(.+)$/gm];
                for (let vLN05 = 0; vLN05 < vA2.length; vLN05++) {
                    const v20 = vA2[vLN05].exec(_0x53f7ce[0]);
                    if (v20 && v20.length === 3) {
                        const v21 = [vO.spawn, vO.spawn, vO.createTribe, vO.chat][vLN05];
                        _0x53f7ce[0] = v20[1] + f12(v20[2]).substr(0, v21);
                        break;
                    }
                }
            } catch {}
            return Reflect.apply(v19, this, _0x53f7ce);
        };
        const v22 = new MutationObserver(() => {
            document.querySelector(".play-game .el-input__inner")?.setAttribute("maxlength", "80");
            document.querySelector(".new-tribe .el-input__inner")?.setAttribute("maxlength", "20");
            document.querySelector(".chat-input input")?.setAttribute("maxLength", "1000");
        });
        v22.observe(document.body, {
            childList: true,
            subtree: true
        });
        v17 = true;
        f4("Special characters enabled");
    }
    let v23 = null;
    let v24 = JSON.parse(localStorage.getItem("musicPlaylist") || "[]");
    let vLN06 = 0;
    let vParseFloat = parseFloat(localStorage.getItem("musicVolume") || "0.5");
    let v25 = localStorage.getItem("musicLoop") !== "false";
    let v26 = localStorage.getItem("musicShuffle") === "true";
    let v27 = null;
    let v28 = false;
    let v29 = false;
    let v30 = null;

    function f13(p19) {
        return /(?:youtube\.com|youtu\.be)/i.test(p19 || "");
    }

    function f14(p20) {
        if (!p20) {
            return null;
        }
        try {
            const v31 = new URL(p20);
            if (v31.hostname.includes("youtu.be")) {
                return v31.pathname.slice(1).split("/")[0] || null;
            }
            if (v31.hostname.includes("youtube.com")) {
                return v31.searchParams.get("v") || (v31.pathname.startsWith("/embed/") ? v31.pathname.split("/embed/")[1]?.split("/")[0] : null) || (v31.pathname.startsWith("/shorts/") ? v31.pathname.split("/shorts/")[1]?.split("/")[0] : null);
            }
        } catch (e) {}
        return null;
    }

    function f15(p21) {
        if (v28 && window.YT && window.YT.Player) {
            p21();
            return;
        }
        if (!window._astYtReadyCallbacks) {
            window._astYtReadyCallbacks = [];
        }
        window._astYtReadyCallbacks.push(p21);
        if (v29) {
            return;
        }
        v29 = true;
        if (!document.getElementById("ast-yt-api")) {
            const v32 = document.createElement("script");
            v32.id = "ast-yt-api";
            v32.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(v32);
        }
        const v33 = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function() {
            v28 = true;
            if (typeof v33 === "function") {
                try {
                    v33();
                } catch (e2) {}
            }
            const v34 = window._astYtReadyCallbacks || [];
            while (v34.length) {
                const v35 = v34.shift();
                try {
                    v35();
                } catch (e3) {}
            }
        };
    }

    function f16() {
        let v36 = document.getElementById("ast-youtube-host");
        if (!v36) {
            v36 = document.createElement("div");
            v36.id = "ast-youtube-host";
            v36.style.cssText = "position:fixed;left:-99999px;top:-99999px;width:1px;height:1px;opacity:0;pointer-events:none;";
            document.body.appendChild(v36);
        }
        return v36;
    }

    function f17(p22) {
        f15(() => {
            const vF16 = f16();
            if (v27 && typeof v27.loadVideoById === "function") {
                v27.loadVideoById(p22);
                try {
                    v27.setVolume(Math.round(vParseFloat * 100));
                } catch (e4) {}
                v30 = "youtube";
                f28();
                return;
            }
            v27 = new YT.Player(vF16, {
                width: "1",
                height: "1",
                videoId: p22,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    rel: 0
                },
                events: {
                    onReady: p23 => {
                        try {
                            p23.target.setVolume(Math.round(vParseFloat * 100));
                            p23.target.playVideo();
                        } catch (e5) {}
                        v30 = "youtube";
                        f28();
                    },
                    onStateChange: p24 => {
                        if (!window.YT) {
                            return;
                        }
                        if (p24.data === YT.PlayerState.ENDED) {
                            if (v26) {
                                f19(Math.floor(Math.random() * v24.length));
                            } else if (v25) {
                                f19(vLN06 + 1);
                            } else {
                                f28();
                            }
                        }
                        if (p24.data === YT.PlayerState.PLAYING || p24.data === YT.PlayerState.PAUSED) {
                            f28();
                        }
                    }
                }
            });
        });
    }

    function f18() {
        if (v23) {
            try {
                v23.pause();
                v23.src = "";
            } catch (e6) {}
            v23 = null;
        }
        if (v27) {
            try {
                v27.stopVideo();
            } catch (e7) {}
        }
        v30 = null;
    }

    function f19(p25) {
        if (!v24.length) {
            f4("No tracks added");
            return;
        }
        if (p25 < 0) {
            p25 = v24.length - 1;
        }
        if (p25 >= v24.length) {
            p25 = 0;
        }
        vLN06 = p25;
        const v37 = v24[vLN06];
        if (!v37 || !v37.url) {
            return;
        }
        f18();
        if (f13(v37.url)) {
            const vF14 = f14(v37.url);
            if (!vF14) {
                f4("Invalid YouTube link");
                return;
            }
            f17(vF14);
            v30 = "youtube";
            f28();
            return;
        }
        v23 = new Audio(v37.url);
        v23.volume = vParseFloat;
        v23.loop = false;
        v30 = "audio";
        v23.play().catch(() => {
            f4("Cannot play audio URL");
        });
        v23.onended = () => {
            if (v26) {
                f19(Math.floor(Math.random() * v24.length));
            } else if (v25) {
                f19(vLN06 + 1);
            } else {
                f28();
            }
        };
        v23.onplay = f28;
        v23.onpause = f28;
        f28();
    }

    function f20() {
        if (v30 === "audio" && v23) {
            v23.pause();
        } else if (v30 === "youtube" && v27) {
            try {
                v27.pauseVideo();
            } catch (e8) {}
        }
        f28();
    }

    function f21() {
        if (v30 === "audio" && v23) {
            v23.play().catch(() => {});
        } else if (v30 === "youtube" && v27) {
            try {
                v27.playVideo();
            } catch (e9) {}
        } else if (v24.length) {
            f19(vLN06);
        }
        f28();
    }

    function f22() {
        if (v30 === "audio" && v23) {
            v23.pause();
            v23.currentTime = 0;
        } else if (v30 === "youtube" && v27) {
            try {
                v27.stopVideo();
            } catch (e10) {}
        }
        v30 = null;
        f28();
    }

    function f23() {
        if (v30 === "audio" && v23) {
            return !v23.paused;
        }
        if (v30 === "youtube" && v27 && window.YT) {
            try {
                return v27.getPlayerState() === YT.PlayerState.PLAYING;
            } catch (e11) {}
        }
        return false;
    }

    function f24() {
        if (!v24.length) {
            return;
        }
        f19(v26 ? Math.floor(Math.random() * v24.length) : vLN06 + 1);
    }

    function f25() {
        if (!v24.length) {
            return;
        }
        f19(vLN06 - 1);
    }

    function f26(p26, p27) {
        if (!p26) {
            return;
        }
        p27 = p27 || p26.split("/").pop().split("?")[0] || "Track " + (v24.length + 1);
        v24.push({
            url: p26,
            name: p27
        });
        localStorage.setItem("musicPlaylist", JSON.stringify(v24));
        f28();
        f4("Added: " + p27);
    }

    function f27(p28) {
        v24.splice(p28, 1);
        if (vLN06 >= v24.length) {
            vLN06 = 0;
        }
        localStorage.setItem("musicPlaylist", JSON.stringify(v24));
        if (!v24.length) {
            f22();
        }
        f28();
    }

    function f28() {
        const v38 = document.getElementById("music-panel");
        if (!v38) {
            return;
        }
        const vF23 = f23();
        const v39 = v38.querySelector("#musicPlayBtn");
        const v40 = v38.querySelector("#musicTrackName");
        const v41 = v38.querySelector("#musicTrackList");
        const v42 = v38.querySelector("#musicLoopBtn");
        const v43 = v38.querySelector("#musicShuffleBtn");
        if (v39) {
            v39.textContent = vF23 ? "Pause" : "Play";
        }
        if (v42) {
            v42.classList.toggle("toggle-on", v25);
        }
        if (v43) {
            v43.classList.toggle("toggle-on", v26);
        }
        if (v40) {
            v40.textContent = v24.length ? v24[vLN06]?.name || "Track " + (vLN06 + 1) : "No tracks";
        }
        if (v41) {
            v41.innerHTML = "";
            v24.forEach((p29, p30) => {
                const v44 = document.createElement("div");
                v44.style.cssText = "display:flex;gap:4px;margin-bottom:3px;align-items:center;";
                const v45 = p30 === vLN06 && (v23 || v27);
                v44.innerHTML = "\n          <button class=\"ast-btn" + (v45 ? " toggle-on" : "") + "\" style=\"flex:1;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left;\" title=\"" + p29.name + "\">" + p29.name.substring(0, 22) + "</button>\n          <button class=\"ast-btn\" style=\"width:28px;margin:0;text-align:center;padding:6px 4px;color:#f44336;flex-shrink:0;\">X</button>";
                v44.querySelectorAll("button")[0].onclick = () => f19(p30);
                v44.querySelectorAll("button")[1].onclick = () => f27(p30);
                v41.appendChild(v44);
            });
            if (!v24.length) {
                v41.innerHTML = "<div style=\"font-size:11px;color:#555;text-align:center;padding:6px 0;\">No tracks yet</div>";
            }
        }
    }
    let v46 = null;
    let vLN07 = 0;
    const vA3 = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const vLN300 = 300;

    function f29() {
        return document.querySelector("#gameCanvas") || document.querySelector("canvas") || document.querySelector("#canvas-container canvas");
    }

    function f30() {
        if (v46) {
            return;
        }
        const vF29 = f29();
        if (!vF29) {
            f4("Canvas not found");
            return;
        }
        v46 = setInterval(() => {
            const v47 = vA3[vLN07];
            const v48 = Math.PI * 2 * v47 / 360;
            const v49 = Math.round(vLN300 * Math.sin(v48));
            const v50 = Math.round(vLN300 * Math.cos(v48));
            vF29.dispatchEvent(new MouseEvent("pointermove", {
                clientX: window.innerWidth / 2 + v49,
                clientY: window.innerHeight / 2 + v50,
                bubbles: true
            }));
            vLN07 = (vLN07 + 1) % vA3.length;
        }, 15);
    }

    function f31() {
        if (v46) {
            clearInterval(v46);
            v46 = null;
        }
    }

    function f32() {
        if (v46) {
            f31();
        } else {
            f30();
        }
    }
    let vLSQ = "q";
    let vLSE = "e";
    const vLN400 = 400;

    function f33(p31) {
        const vF292 = f29();
        if (!vF292) {
            return;
        }
        const v51 = vF292.getBoundingClientRect();
        const v52 = v51.left + v51.width / 2;
        const v53 = v51.top + v51.height / 2;
        const v54 = p31 === "left" ? v52 - vLN400 : v52 + vLN400;
        vF292.dispatchEvent(new MouseEvent("pointermove", {
            clientX: v54,
            clientY: v53,
            bubbles: true,
            view: window
        }));
    }
    document.addEventListener("keydown", p32 => {
        if (p32.target.matches("input,textarea,select,[contenteditable]")) {
            return;
        }
        if (p32.repeat) {
            return;
        }
        if (p32.key.toLowerCase() === vLSQ.toLowerCase()) {
            p32.preventDefault();
            p32.stopPropagation();
            f33("left");
        }
        if (p32.key.toLowerCase() === vLSE.toLowerCase()) {
            p32.preventDefault();
            p32.stopPropagation();
            f33("right");
        }
    }, true);
    let v55;
    let v56;
    let v57;
    let v58 = false;
    let v59 = false;
    const vF4 = p33 => {
        return [...Object.getOwnPropertyNames(Object.getPrototypeOf(p33)), ...Object.getOwnPropertyNames(p33)];
    };
    const vO2 = {};

    function f34(p34) {
        if (!p34) {
            return false;
        }
        if (p34.type === 1) {
            return true;
        }
        if (p34.playerRoomId != null) {
            return true;
        }
        if (p34.entityName != null && p34.entityName.length > 0) {
            return true;
        }
        if (p34.visibleFishLevel != null && p34.visibleFishLevel > 0) {
            return true;
        }
        return false;
    }

    function f35() {
        try {
            if (v57 && v57.myAnimals && v57.myAnimals.length > 0) {
                return v57;
            }
            const v60 = window.__ss?.states;
            if (!v60) {
                return v57 || null;
            }
            for (let vLN08 = 0; vLN08 < v60.length; vLN08++) {
                if (v60[vLN08]?.gameScene?.myAnimals) {
                    return v60[vLN08].gameScene;
                }
                if (v60[vLN08]?.gameManager) {
                    for (const v61 of Object.keys(v60[vLN08].gameManager)) {
                        if (v60[vLN08].gameManager[v61]?.myAnimals) {
                            return v60[vLN08].gameManager[v61];
                        }
                    }
                }
            }
            return v57 || null;
        } catch (e12) {
            return v57 || null;
        }
    }

    function f36(p35) {
        if (!p35) {
            p35 = f35();
        }
        if (!p35) {
            return null;
        }
        if (window.__cachedEM) {
            return window.__cachedEM;
        }
        if (vO2.entityManager) {
            const v62 = p35[vO2.entityManager];
            if (v62) {
                window.__cachedEM = v62;
                return v62;
            }
        }
        for (const v63 of Object.keys(p35)) {
            const v64 = p35[v63];
            if (v64 && typeof v64 === "object" && !Array.isArray(v64) && (v64.entitiesList || v64.entitiesById)) {
                window.__cachedEM = v64;
                return v64;
            }
        }
        return null;
    }

    function f37() {
        try {
            const vF35 = f35();
            if (!vF35) {
                return null;
            }
            if (vF35.myAnimals && vF35.myAnimals.length > 0) {
                return vF35.myAnimals[0];
            }
            if (vF35.myPiranhas && vF35.myPiranhas.length > 0) {
                return vF35.myPiranhas[0];
            }
            return null;
        } catch (e13) {
            return null;
        }
    }

    function f38() {
        try {
            const vF37 = f37();
            if (!vF37) {
                return null;
            }
            const v65 = vF37.position;
            return {
                x: v65._x !== undefined ? v65._x : v65.x,
                y: v65._y !== undefined ? v65._y : v65.y
            };
        } catch (e14) {
            return null;
        }
    }

    function f39(p36) {
        if (!p36 || !p36.position) {
            return null;
        }
        return {
            x: p36.position._x !== undefined ? p36.position._x : p36.position.x,
            y: p36.position._y !== undefined ? p36.position._y : p36.position.y
        };
    }

    function f40(p37) {
        if (!p37) {
            return {
                dirX: 1,
                dirY: 0
            };
        }
        let vLN09 = 0;
        let vLN010 = 0;
        if (p37.velocity) {
            vLN09 = p37.velocity._x || p37.velocity.x || 0;
            vLN010 = p37.velocity._y || p37.velocity.y || 0;
        }
        if (Math.abs(vLN09) < 0.01 && Math.abs(vLN010) < 0.01) {
            const v66 = p37.rotation || p37.angle || p37._rotation || 0;
            vLN09 = Math.cos(v66);
            vLN010 = Math.sin(v66);
        }
        const v67 = Math.sqrt(vLN09 * vLN09 + vLN010 * vLN010);
        if (v67 > 0.001) {
            vLN09 /= v67;
            vLN010 /= v67;
        } else {
            vLN09 = 1;
            vLN010 = 0;
        }
        return {
            dirX: vLN09,
            dirY: vLN010
        };
    }

    function f41(p38) {
        try {
            const vF352 = f35();
            if (!vF352) {
                return null;
            }
            const vF36 = f36(vF352);
            if (!vF36) {
                return null;
            }
            let v68 = vF36.entitiesById ? vF36.entitiesById[p38] : null;
            if (!v68 && vF36.entitiesList) {
                v68 = vF36.entitiesList.find(p39 => p39.id === p38);
            }
            if (!v68 && vF36.animalsByPlayerRoomId) {
                for (let v69 of Object.keys(vF36.animalsByPlayerRoomId)) {
                    const v70 = vF36.animalsByPlayerRoomId[v69];
                    if (Array.isArray(v70)) {
                        v68 = v70.find(p40 => p40 && p40.id === p38);
                    } else if (v70 && v70.id === p38) {
                        v68 = v70;
                    }
                    if (v68) {
                        break;
                    }
                }
            }
            return v68;
        } catch (e15) {
            return null;
        }
    }

    function f42(p41, p42, p43, p44) {
        return Math.sqrt((p43 - p41) * (p43 - p41) + (p44 - p42) * (p44 - p42));
    }

    function f43() {
        try {
            const vF353 = f35();
            const vF362 = f36(vF353);
            const vF372 = f37();
            const vF38 = f38();
            if (!vF362 || !vF372 || !vF38) {
                return null;
            }
            const vO3 = {
                myId: vF372.id,
                myPos: vF38,
                entities: [],
                players: [],
                food: []
            };
            const v71 = vF362.entitiesList || [];
            for (let vLN011 = 0; vLN011 < v71.length; vLN011++) {
                const v72 = v71[vLN011];
                if (!v72 || v72.id === vF372.id) {
                    continue;
                }
                if (vF372.playerRoomId && v72.playerRoomId === vF372.playerRoomId) {
                    continue;
                }
                const vF39 = f39(v72);
                if (!vF39 || vF39.x == null || vF39.y == null) {
                    continue;
                }
                const v73 = vF39.x - vF38.x;
                const v74 = vF39.y - vF38.y;
                const v75 = Math.sqrt(v73 * v73 + v74 * v74);
                const vO4 = {
                    id: v72.id,
                    x: vF39.x,
                    y: vF39.y,
                    distance: v75,
                    angle: Math.atan2(v74, v73),
                    entity: {
                        ...v72,
                        name: v72.entityName || v72.name || null
                    }
                };
                vO3.entities.push(vO4);
                if (v72.type === 1 || f34(v72)) {
                    vO3.players.push(vO4);
                } else if (v72.type === 2 || !f34(v72)) {
                    vO3.food.push(vO4);
                }
            }
            vO3.players.sort((p45, p46) => p45.distance - p46.distance);
            vO3.food.sort((p47, p48) => p47.distance - p48.distance);
            return vO3;
        } catch (e16) {
            return {
                error: e16.message
            };
        }
    }

    function f44() {
        try {
            const v76 = window.__ss?.states?.find(p49 => p49?.gameScene?.game?.viewport?.scale?.x);
            if (v76) {
                return v76.gameScene.game.viewport.scale.x;
            }
        } catch (e17) {}
        return 0.554;
    }
    window.lockEnabled = false;
    window.lockTargetId = null;
    window.lockKey = "t";
    let v77 = false;

    function f45() {
        if (!v77) {
            return;
        }
        requestAnimationFrame(f45);
        if (!window.lockEnabled || !window.lockTargetId) {
            return;
        }
        try {
            const vF41 = f41(window.lockTargetId);
            if (!vF41) {
                f4("Lock target lost");
                window.lockTargetId = null;
                window.lockEnabled = false;
                f47();
                return;
            }
            const vF392 = f39(vF41);
            const vF382 = f38();
            if (!vF392 || !vF382) {
                return;
            }
            const vF293 = f29();
            if (!vF293) {
                return;
            }
            const v78 = vF293.getBoundingClientRect();
            const v79 = v78.left + v78.width / 2;
            const v80 = v78.top + v78.height / 2;
            const v81 = vF392.x - vF382.x;
            const v82 = vF392.y - vF382.y;
            const v83 = Math.sqrt(v81 * v81 + v82 * v82);
            let v84 = vF392.x;
            let v85 = vF392.y;
            if (vF41.velocity) {
                const v86 = vF41.velocity._x || vF41.velocity.x || 0;
                const v87 = vF41.velocity._y || vF41.velocity.y || 0;
                const v88 = Math.min(v83 / 800, 0.5);
                v84 += v86 * v88;
                v85 += v87 * v88;
            }
            const v89 = v84 - vF382.x;
            const v90 = v85 - vF382.y;
            const v91 = Math.sqrt(v89 * v89 + v90 * v90);
            let vLN15 = 1.5;
            if (v91 > 2000) {
                vLN15 = 3;
            } else if (v91 > 1000) {
                vLN15 = 2;
            } else if (v91 < 200) {
                vLN15 = 0.8;
            }
            const v92 = Math.min(v78.width, v78.height) * 0.85;
            let v93 = v89 * vLN15;
            let v94 = v90 * vLN15;
            const v95 = Math.sqrt(v93 * v93 + v94 * v94);
            if (v95 > v92) {
                const v96 = v92 / v95;
                v93 *= v96;
                v94 *= v96;
            }
            vF293.dispatchEvent(new MouseEvent("pointermove", {
                clientX: v79 + v93,
                clientY: v80 + v94,
                bubbles: true,
                view: window
            }));
        } catch (e18) {}
    }

    function f46() {
        if (window.lockEnabled && window.lockTargetId) {
            window.lockEnabled = false;
            window.lockTargetId = null;
            f4("Lock released");
        } else {
            const vF43 = f43();
            if (vF43 && vF43.players && vF43.players.length > 0) {
                window.lockEnabled = true;
                window.lockTargetId = vF43.players[0].id;
                const v97 = vF43.players[0].entity?.name || "ID:" + window.lockTargetId;
                f4("Locked: " + v97);
            } else {
                f4("No players to lock on");
            }
        }
        f47();
    }

    function f47() {
        const v98 = document.getElementById("lockBtn");
        if (v98) {
            v98.textContent = window.lockEnabled && window.lockTargetId ? "Unlock" : "Lock Nearest";
            v98.classList.toggle("toggle-on", !!window.lockEnabled && !!window.lockTargetId);
        }
    }
    document.addEventListener("keydown", p50 => {
        if (p50.target.matches("input,textarea,select,[contenteditable]")) {
            return;
        }
        if (p50.repeat) {
            return;
        }
        if (p50.key.toLowerCase() === window.lockKey.toLowerCase()) {
            p50.preventDefault();
            f46();
        }
    }, true);
    window.entityTrailColor = {
        r: 255,
        g: 150,
        b: 0
    };
    window.entityTrailEnabled = false;
    window.entityTrailTargetId = null;
    window.entityTrailHistory = [];
    window.entityTrailMaxLength = 200;
    window.entityTrailRecordInterval = 100;
    window.entityTraceKey = "h";
    let v99 = null;

    function f48() {
        if (v99) {
            clearInterval(v99);
            v99 = null;
        }
        v99 = setInterval(() => {
            if (!window.entityTrailEnabled || !window.entityTrailTargetId) {
                return;
            }
            const vF412 = f41(window.entityTrailTargetId);
            if (!vF412) {
                const vF432 = f43();
                if (vF432 && vF432.players && vF432.players.length > 0) {
                    window.entityTrailTargetId = vF432.players[0].id;
                }
                return;
            }
            const vF393 = f39(vF412);
            if (!vF393) {
                return;
            }
            const v100 = window.entityTrailHistory[window.entityTrailHistory.length - 1];
            if (v100 && f42(v100.x, v100.y, vF393.x, vF393.y) < 5) {
                return;
            }
            window.entityTrailHistory.push({
                x: vF393.x,
                y: vF393.y,
                time: Date.now()
            });
            if (window.entityTrailHistory.length > window.entityTrailMaxLength) {
                window.entityTrailHistory.shift();
            }
        }, window.entityTrailRecordInterval);
    }

    function f49() {
        if (v99) {
            clearInterval(v99);
            v99 = null;
        }
    }

    function f50() {
        if (window.entityTrailEnabled) {
            window.entityTrailEnabled = false;
            window.entityTrailTargetId = null;
            f49();
            window.entityTrailHistory = [];
            f4("Trail stopped");
            f51();
            return;
        }
        const vF433 = f43();
        const v101 = vF433 && vF433.players && vF433.players.length > 0;
        if (!v101) {
            f4("No players nearby to trace");
            return;
        }
        const v102 = vF433.players[0].id;
        const v103 = vF433.players[0].entity?.name || "ID:" + v102;
        window.entityTrailEnabled = true;
        window.entityTrailTargetId = v102;
        window.entityTrailHistory = [];
        f48();
        f4("Tracing: " + v103);
        f51();
    }

    function f51() {}
    document.addEventListener("keydown", p51 => {
        if (p51.target.matches("input,textarea,select,[contenteditable]")) {
            return;
        }
        if (p51.repeat) {
            return;
        }
        const v104 = window.entityTraceKey.toLowerCase();
        const v105 = p51.key.toLowerCase();
        const v106 = p51.code.toLowerCase();
        if (v105 === v104 || v106 === v104 || v106 === "key" + v104) {
            p51.preventDefault();
            f50();
        }
    }, true);

    function f52(p52, p53, p54, p55) {
        if (!window.entityTrailEnabled || window.entityTrailHistory.length < 2) {
            return;
        }
        const v107 = p53.width / 2;
        const v108 = p53.height / 2;
        const v109 = Date.now();
        const vLN30000 = 30000;
        const {
            r: _0x419990,
            g: _0xa423be,
            b: _0x3277b4
        } = window.entityTrailColor;
        for (let vLN1 = 1; vLN1 < window.entityTrailHistory.length; vLN1++) {
            const v110 = window.entityTrailHistory[vLN1 - 1];
            const v111 = window.entityTrailHistory[vLN1];
            const v112 = v109 - v111.time;
            const v113 = Math.max(0.05, 1 - v112 / vLN30000);
            const v114 = v107 + (v110.x - p54.x) * p55;
            const v115 = v108 + (v110.y - p54.y) * p55;
            const v116 = v107 + (v111.x - p54.x) * p55;
            const v117 = v108 + (v111.y - p54.y) * p55;
            const v118 = vLN1 / window.entityTrailHistory.length;
            p52.beginPath();
            p52.moveTo(v114, v115);
            p52.lineTo(v116, v117);
            p52.strokeStyle = "rgba(" + _0x419990 + "," + _0xa423be + "," + _0x3277b4 + "," + v113 + ")";
            p52.lineWidth = 1.5 + v118 * 1.5;
            p52.stroke();
        }
        for (let vLN012 = 0; vLN012 < window.entityTrailHistory.length; vLN012 += 5) {
            const v119 = window.entityTrailHistory[vLN012];
            const v120 = v109 - v119.time;
            const v121 = Math.max(0.1, 1 - v120 / vLN30000);
            const v122 = v107 + (v119.x - p54.x) * p55;
            const v123 = v108 + (v119.y - p54.y) * p55;
            p52.fillStyle = "rgba(" + _0x419990 + "," + _0xa423be + "," + _0x3277b4 + "," + v121 + ")";
            p52.beginPath();
            p52.arc(v122, v123, 2, 0, Math.PI * 2);
            p52.fill();
        }
        if (window.entityTrailHistory.length > 0) {
            const v124 = window.entityTrailHistory[window.entityTrailHistory.length - 1];
            const v125 = v107 + (v124.x - p54.x) * p55;
            const v126 = v108 + (v124.y - p54.y) * p55;
            p52.fillStyle = "rgb(" + _0x419990 + "," + _0xa423be + "," + _0x3277b4 + ")";
            p52.font = "bold 10px monospace";
            p52.fillText("TRAIL (" + window.entityTrailHistory.length + " pts)", v125 + 8, v126 - 8);
        }
    }

    function f53(p56, p57) {
        let v127 = document.getElementById(p56);
        if (!v127) {
            v127 = document.createElement("canvas");
            v127.id = p56;
            v127.style.cssText = "position:fixed;top:0;left:0;pointer-events:none;z-index:" + p57 + ";";
            document.body.appendChild(v127);
        }
        const vF294 = f29();
        if (vF294) {
            const v128 = vF294.getBoundingClientRect();
            if (v127.width !== v128.width || v127.height !== v128.height) {
                v127.width = v128.width;
                v127.height = v128.height;
            }
            v127.style.left = v128.left + "px";
            v127.style.top = v128.top + "px";
            v127.style.width = v128.width + "px";
            v127.style.height = v128.height + "px";
        } else if (v127.width !== window.innerWidth || v127.height !== window.innerHeight) {
            v127.width = window.innerWidth;
            v127.height = window.innerHeight;
        }
        return v127;
    }

    function f54() {
        const vF53 = f53("ast-overlay", 999997);
        const v129 = vF53.getContext("2d");
        v129.clearRect(0, 0, vF53.width, vF53.height);
        const vF383 = f38();
        if (vF383 && window.entityTrailEnabled) {
            f52(v129, vF53, vF383, f44());
        }
        requestAnimationFrame(f54);
    }
    window.espEnabled = false;
    window.espColors = {
        close: "#ff0000",
        medium: "#ffff00",
        far: "#00ffff",
        veryFar: "#00ff00",
        tracked: "#ff00ff",
        foodClose: "#00ff00",
        foodMedium: "#88ff88",
        foodFar: "#44cc44"
    };
    window.espTrackedEntityId = null;
    window.espMode = "players";

    function f55(p58, p59, p60, p61, p62) {
        if (!p59 || p59.error) {
            return;
        }
        const v130 = p59.myPos;
        const v131 = window.espMode;
        const v132 = window.espTrackedEntityId;
        let v133 = v131 === "players" ? p59.players || [] : p59.food || [];
        let vLN013 = 0;
        let vLN014 = 0;
        try {
            if (v55?.viewport) {
                const v134 = v55.viewport;
                if (v134.center && v134.center.x != null) {
                    vLN013 = (v134.center.x - v130.x) * p62;
                    vLN014 = (v134.center.y - v130.y) * p62;
                }
            }
        } catch (e19) {}
        v133.forEach(p63 => {
            const v135 = p63.x - v130.x;
            const v136 = p63.y - v130.y;
            const v137 = p60 + v135 * p62 - vLN013;
            const v138 = p61 + v136 * p62 - vLN014;
            const v139 = v132 && p63.id === v132;
            const vLN20 = 20;
            let v140;
            if (v131 === "players") {
                v140 = v139 ? window.espColors.tracked : p63.distance < 500 ? window.espColors.close : p63.distance < 1500 ? window.espColors.medium : p63.distance < 3000 ? window.espColors.far : window.espColors.veryFar;
                p58.strokeStyle = v140;
                p58.lineWidth = v139 ? 3 : 2;
                p58.strokeRect(v137 - vLN20 / 2, v138 - vLN20 / 2, vLN20, vLN20);
                p58.fillStyle = v140;
                p58.font = "bold 11px monospace";
                p58.fillText(p63.entity?.entityName || p63.entity?.name || "ID:" + p63.id, v137 - vLN20 / 2, v138 - vLN20 / 2 - 8);
                p58.font = "10px monospace";
                p58.fillText(Math.round(p63.distance).toString(), v137 - vLN20 / 2, v138 + vLN20 / 2 + 13);
                if (p63.entity?.visibleFishLevel != null) {
                    p58.fillText("Lvl:" + p63.entity.visibleFishLevel, v137 - vLN20 / 2, v138 + vLN20 / 2 + 24);
                }
                if (window.lockEnabled && window.lockTargetId === p63.id) {
                    p58.strokeStyle = "#ff0000";
                    p58.lineWidth = 2;
                    const vLN152 = 15;
                    p58.beginPath();
                    p58.moveTo(v137 - vLN152, v138);
                    p58.lineTo(v137 + vLN152, v138);
                    p58.moveTo(v137, v138 - vLN152);
                    p58.lineTo(v137, v138 + vLN152);
                    p58.stroke();
                    p58.beginPath();
                    p58.arc(v137, v138, vLN152, 0, Math.PI * 2);
                    p58.strokeStyle = "rgba(255,0,0,0.7)";
                    p58.stroke();
                    p58.fillStyle = "#ff0000";
                    p58.font = "bold 10px monospace";
                    p58.fillText("LOCKED", v137 + vLN152 + 4, v138 - 4);
                }
                p58.beginPath();
                p58.moveTo(p60, p61);
                p58.lineTo(v137, v138);
                p58.strokeStyle = v140;
                p58.globalAlpha = 0.25;
                p58.lineWidth = 1;
                p58.stroke();
                p58.globalAlpha = 1;
            } else {
                v140 = p63.distance < 300 ? window.espColors.foodClose : p63.distance < 1000 ? window.espColors.foodMedium : window.espColors.foodFar;
                p58.strokeStyle = v140;
                p58.lineWidth = 1.5;
                p58.strokeRect(v137 - vLN20 / 2, v138 - vLN20 / 2, vLN20, vLN20);
                if (p63.distance < 1000) {
                    p58.fillStyle = v140;
                    p58.font = "9px monospace";
                    p58.fillText(Math.round(p63.distance).toString(), v137 + vLN20 / 2 + 3, v138 + 3);
                }
            }
        });
    }

    function f56(p64, p65, p66, p67) {
        if (!window.espTrackedEntityId) {
            return;
        }
        const vF413 = f41(window.espTrackedEntityId);
        if (!vF413) {
            return;
        }
        if (!f34(vF413)) {
            window.espTrackedEntityId = null;
            return;
        }
        const vF394 = f39(vF413);
        if (!vF394 || !p66) {
            return;
        }
        const v141 = p65.width / 2;
        const v142 = p65.height / 2;
        const v143 = vF394.x - p66.x;
        const v144 = vF394.y - p66.y;
        const v145 = v141 + v143 * p67;
        const v146 = v142 + v144 * p67;
        const vF42 = f42(p66.x, p66.y, vF394.x, vF394.y);
        const vF40 = f40(vF413);
        const v147 = Math.sin(Date.now() / 200) * 0.3 + 0.7;
        const vLN40 = 40;
        p64.beginPath();
        p64.moveTo(v141, v142);
        p64.lineTo(v145, v146);
        p64.strokeStyle = "rgba(255,0,255,0.6)";
        p64.lineWidth = 2;
        p64.setLineDash([8, 4]);
        p64.stroke();
        p64.setLineDash([]);
        p64.strokeStyle = "rgba(255,0,255," + v147 + ")";
        p64.lineWidth = 3;
        p64.strokeRect(v145 - vLN40 / 2, v146 - vLN40 / 2, vLN40, vLN40);
        const vLN50 = 50;
        const v148 = Math.atan2(vF40.dirY, vF40.dirX);
        p64.beginPath();
        p64.moveTo(v145, v146);
        p64.lineTo(v145 + vF40.dirX * vLN50, v146 + vF40.dirY * vLN50);
        p64.strokeStyle = "#ff00ff";
        p64.lineWidth = 2;
        p64.stroke();
        p64.beginPath();
        p64.moveTo(v145 + vF40.dirX * vLN50, v146 + vF40.dirY * vLN50);
        p64.lineTo(v145 + vF40.dirX * vLN50 - Math.cos(v148 - 0.4) * 10, v146 + vF40.dirY * vLN50 - Math.sin(v148 - 0.4) * 10);
        p64.moveTo(v145 + vF40.dirX * vLN50, v146 + vF40.dirY * vLN50);
        p64.lineTo(v145 + vF40.dirX * vLN50 - Math.cos(v148 + 0.4) * 10, v146 + vF40.dirY * vLN50 - Math.sin(v148 + 0.4) * 10);
        p64.strokeStyle = "#ff00ff";
        p64.lineWidth = 2;
        p64.stroke();
        const vLN180 = 180;
        const vLN70 = 70;
        const v149 = Math.min(v145 + vLN40 / 2 + 10, p65.width - vLN180 - 5);
        const v150 = Math.max(5, Math.min(v146 - vLN70 / 2, p65.height - vLN70 - 5));
        p64.fillStyle = "rgba(0,0,0,0.85)";
        p64.strokeStyle = "rgba(255,0,255," + v147 + ")";
        p64.lineWidth = 1.5;
        p64.beginPath();
        p64.roundRect(v149, v150, vLN180, vLN70, 4);
        p64.fill();
        p64.stroke();
        p64.fillStyle = "#ff00ff";
        p64.font = "bold 12px monospace";
        p64.fillText("TRACKING", v149 + 8, v150 + 18);
        p64.fillStyle = "#ffffff";
        p64.font = "11px monospace";
        p64.fillText((vF413.name || "Entity " + window.espTrackedEntityId).substring(0, 18), v149 + 8, v150 + 34);
        p64.fillStyle = "#ff00ff";
        p64.font = "bold 14px monospace";
        p64.fillText(Math.round(vF42) + " units", v149 + 8, v150 + 52);
        if (v145 < 0 || v145 > p65.width || v146 < 0 || v146 > p65.height) {
            const v151 = Math.atan2(v146 - v142, v145 - v141);
            const v152 = v141 + Math.cos(v151) * (p65.width / 2 - 40);
            const v153 = v142 + Math.sin(v151) * (p65.height / 2 - 40);
            p64.fillStyle = "rgba(0,0,0,0.85)";
            p64.beginPath();
            p64.roundRect(v152 - 40, v153 - 15, 80, 30, 4);
            p64.fill();
            p64.strokeStyle = "#ff00ff";
            p64.lineWidth = 1.5;
            p64.stroke();
            p64.beginPath();
            p64.moveTo(v152 + Math.cos(v151) * 20, v153 + Math.sin(v151) * 20);
            p64.lineTo(v152 - Math.cos(v151 - 0.5) * 10, v153 - Math.sin(v151 - 0.5) * 10);
            p64.lineTo(v152 - Math.cos(v151 + 0.5) * 10, v153 - Math.sin(v151 + 0.5) * 10);
            p64.closePath();
            p64.fillStyle = "#ff00ff";
            p64.fill();
            p64.fillStyle = "#ffffff";
            p64.font = "bold 11px monospace";
            p64.textAlign = "center";
            p64.fillText(Math.round(vF42).toString(), v152, v153 + 4);
            p64.textAlign = "left";
        }
    }
    let vO5 = {
        dragging: false,
        offsetX: 0,
        offsetY: 0,
        x: null,
        y: 20
    };

    function f57(p68, p69, p70) {
        if (!p70 || p70.error) {
            return;
        }
        const vLN150 = 150;
        if (vO5.x === null) {
            vO5.x = p69.width - vLN150 - 20;
        }
        const v154 = vO5.x;
        const v155 = vO5.y;
        const vLN5000 = 5000;
        const v156 = vLN150 / (vLN5000 * 2);
        window._radarBounds = {
            x: v154,
            y: v155,
            w: vLN150,
            h: vLN150 + 22
        };
        p68.fillStyle = "rgba(20,20,20,0.9)";
        p68.beginPath();
        p68.roundRect(v154, v155, vLN150, vLN150, 4);
        p68.fill();
        p68.strokeStyle = "#333";
        p68.lineWidth = 1;
        p68.stroke();
        p68.strokeStyle = "rgba(60,60,60,0.5)";
        p68.lineWidth = 0.5;
        p68.beginPath();
        p68.moveTo(v154 + vLN150 / 2, v155);
        p68.lineTo(v154 + vLN150 / 2, v155 + vLN150);
        p68.moveTo(v154, v155 + vLN150 / 2);
        p68.lineTo(v154 + vLN150, v155 + vLN150 / 2);
        p68.stroke();
        for (let vLN025 = 0.25; vLN025 <= 1; vLN025 += 0.25) {
            p68.beginPath();
            p68.arc(v154 + vLN150 / 2, v155 + vLN150 / 2, vLN150 / 2 * vLN025, 0, Math.PI * 2);
            p68.strokeStyle = "rgba(60,60,60," + (0.2 + vLN025 * 0.1) + ")";
            p68.stroke();
        }
        p68.fillStyle = "#1db954";
        p68.beginPath();
        p68.arc(v154 + vLN150 / 2, v155 + vLN150 / 2, 4, 0, Math.PI * 2);
        p68.fill();
        const v157 = window.espMode === "players" ? p70.players || [] : p70.food || [];
        v157.forEach(p71 => {
            const v158 = p71.x - p70.myPos.x;
            const v159 = p71.y - p70.myPos.y;
            let v160 = Math.max(v154 + 2, Math.min(v154 + vLN150 - 2, v154 + vLN150 / 2 + v158 * v156));
            let v161 = Math.max(v155 + 2, Math.min(v155 + vLN150 - 2, v155 + vLN150 / 2 + v159 * v156));
            let v162;
            let v163;
            if (window.espMode === "players") {
                v162 = p71.distance < 500 ? window.espColors.close : p71.distance < 1500 ? window.espColors.medium : p71.distance < 3000 ? window.espColors.far : "#888";
                v163 = 3;
            } else {
                v162 = window.espColors.foodClose;
                v163 = 1.5;
            }
            if (window.espTrackedEntityId && p71.id === window.espTrackedEntityId) {
                v162 = window.espColors.tracked;
                v163 = 4;
            }
            if (window.lockTargetId && p71.id === window.lockTargetId) {
                v162 = "#ff0000";
                v163 = 4;
            }
            p68.fillStyle = v162;
            p68.beginPath();
            p68.arc(v160, v161, v163, 0, Math.PI * 2);
            p68.fill();
        });
        if (window.entityTrailEnabled && window.entityTrailTargetId) {
            const vF414 = f41(window.entityTrailTargetId);
            if (vF414) {
                const vF395 = f39(vF414);
                if (vF395) {
                    const v164 = vF395.x - p70.myPos.x;
                    const v165 = vF395.y - p70.myPos.y;
                    const v166 = Math.max(v154 + 2, Math.min(v154 + vLN150 - 2, v154 + vLN150 / 2 + v164 * v156));
                    const v167 = Math.max(v155 + 2, Math.min(v155 + vLN150 - 2, v155 + vLN150 / 2 + v165 * v156));
                    const v168 = Math.sin(Date.now() / 200) * 0.3 + 0.7;
                    const {
                        r: _0x5b58c9,
                        g: _0x117ce0,
                        b: _0x2a6d1b
                    } = window.entityTrailColor;
                    const v169 = _0x5b58c9 + "," + _0x117ce0 + "," + _0x2a6d1b;
                    p68.strokeStyle = "rgba(" + v169 + "," + v168 + ")";
                    p68.lineWidth = 2;
                    p68.beginPath();
                    p68.arc(v166, v167, 7, 0, Math.PI * 2);
                    p68.stroke();
                    p68.strokeStyle = "rgba(" + v169 + "," + v168 * 0.5 + ")";
                    p68.lineWidth = 4;
                    p68.beginPath();
                    p68.arc(v166, v167, 10, 0, Math.PI * 2);
                    p68.stroke();
                    p68.fillStyle = "rgb(" + v169 + ")";
                    p68.beginPath();
                    p68.arc(v166, v167, 3, 0, Math.PI * 2);
                    p68.fill();
                    if (window.entityTrailHistory.length > 1) {
                        p68.strokeStyle = "rgba(" + v169 + ",0.3)";
                        p68.lineWidth = 1;
                        p68.beginPath();
                        window.entityTrailHistory.forEach((p72, p73) => {
                            const v170 = Math.max(v154 + 2, Math.min(v154 + vLN150 - 2, v154 + vLN150 / 2 + (p72.x - p70.myPos.x) * v156));
                            const v171 = Math.max(v155 + 2, Math.min(v155 + vLN150 - 2, v155 + vLN150 / 2 + (p72.y - p70.myPos.y) * v156));
                            if (p73 === 0) {
                                p68.moveTo(v170, v171);
                            } else {
                                p68.lineTo(v170, v171);
                            }
                        });
                        p68.stroke();
                    }
                }
            }
        }
        p68.fillStyle = "rgba(20,20,20,0.9)";
        p68.beginPath();
        p68.roundRect(v154, v155 + vLN150, vLN150, 22, [0, 0, 4, 4]);
        p68.fill();
        p68.fillStyle = "#888";
        p68.font = "10px monospace";
        p68.fillText("RADAR", v154 + 5, v155 + vLN150 + 14);
        p68.fillText((window.espMode === "players" ? "P:" : "F:") + v157.length, v154 + vLN150 - 50, v155 + vLN150 + 14);
    }

    function f58() {
        if (window._radarDragInit) {
            return;
        }
        window._radarDragInit = true;
        document.addEventListener("mousedown", p74 => {
            const v172 = window._radarBounds;
            if (!v172 || !window.espEnabled) {
                return;
            }
            if (p74.clientX >= v172.x && p74.clientX <= v172.x + v172.w && p74.clientY >= v172.y && p74.clientY <= v172.y + v172.h) {
                vO5.dragging = true;
                vO5.offsetX = p74.clientX - v172.x;
                vO5.offsetY = p74.clientY - v172.y;
                p74.preventDefault();
                p74.stopPropagation();
            }
        }, true);
        document.addEventListener("mousemove", p75 => {
            if (!vO5.dragging) {
                return;
            }
            vO5.x = p75.clientX - vO5.offsetX;
            vO5.y = p75.clientY - vO5.offsetY;
            p75.preventDefault();
        }, true);
        document.addEventListener("mouseup", p76 => {
            if (vO5.dragging) {
                vO5.dragging = false;
                p76.preventDefault();
            }
        }, true);
    }

    function f59() {
        if (!window.espEnabled) {
            const v173 = document.getElementById("esp-overlay");
            if (v173) {
                v173.getContext("2d").clearRect(0, 0, v173.width, v173.height);
            }
            requestAnimationFrame(f59);
            return;
        }
        const vF532 = f53("esp-overlay", 999998);
        const v174 = vF532.getContext("2d");
        v174.clearRect(0, 0, vF532.width, vF532.height);
        const vF434 = f43();
        const vF384 = f38();
        const vF44 = f44();
        f55(v174, vF434, vF532.width / 2, vF532.height / 2, vF44);
        f56(v174, vF532, vF384, vF44);
        f57(v174, vF532, vF434);
        requestAnimationFrame(f59);
    }

    function f60() {
        window.espEnabled = !window.espEnabled;
        f4(window.espEnabled ? "ESP enabled" : "ESP disabled");
    }

    function f61() {
        const vF435 = f43();
        if (vF435 && vF435.players && vF435.players.length > 0) {
            window.espTrackedEntityId = vF435.players[0].id;
            f4("Tracking: " + (vF435.players[0].entity?.name || window.espTrackedEntityId));
        } else {
            f4("No players nearby");
        }
    }

    function f62() {
        window.espTrackedEntityId = null;
        f4("Tracking cleared");
    }
    document.addEventListener("keydown", p77 => {
        if (p77.target.matches("input,textarea,select")) {
            return;
        }
        if (p77.key === "F3") {
            p77.preventDefault();
            f61();
        }
        if (p77.key === "F4") {
            p77.preventDefault();
            f62();
        }
    });

    function f63(p78, p79) {
        const vF295 = f29();
        if (!vF295) {
            return;
        }
        vF295.dispatchEvent(new PointerEvent("pointerdown", {
            clientX: p78,
            clientY: p79,
            button: 0,
            buttons: 1,
            bubbles: true,
            view: window
        }));
        setTimeout(() => {
            vF295.dispatchEvent(new PointerEvent("pointerup", {
                clientX: p78,
                clientY: p79,
                buttons: 0,
                bubbles: true,
                view: window
            }));
        }, 80);
    }

    function f64(p80, p81, p82) {
        const vF296 = f29();
        if (!vF296) {
            return;
        }
        const vF385 = f38();
        if (!vF385) {
            return;
        }
        const v175 = vF296.getBoundingClientRect();
        const v176 = v175.left + v175.width / 2;
        const v177 = v175.top + v175.height / 2;
        const v178 = p80 - vF385.x;
        const v179 = p81 - vF385.y;
        const v180 = Math.sqrt(v178 * v178 + v179 * v179);
        let vLN12 = 1;
        if (v180 > 5000) {
            vLN12 = 3;
        } else if (v180 > 2000) {
            vLN12 = 2;
        } else if (v180 > 1000) {
            vLN12 = 1.5;
        } else if (v180 > 500) {
            vLN12 = 1.2;
        } else if (v180 < 50) {
            vLN12 = 0.5;
        } else if (v180 < 150) {
            vLN12 = 0.8;
        }
        let v181 = v178 * vLN12;
        let v182 = v179 * vLN12;
        const v183 = Math.min(v175.width, v175.height) * 0.85;
        const v184 = Math.sqrt(v181 * v181 + v182 * v182);
        if (v184 > v183) {
            const v185 = v183 / v184;
            v181 *= v185;
            v182 *= v185;
        }
        const v186 = v176 + v181;
        const v187 = v177 + v182;
        vF296.dispatchEvent(new MouseEvent("pointermove", {
            clientX: v186,
            clientY: v187,
            bubbles: true,
            view: window
        }));
        if (p82) {
            f63(v186, v187);
        }
    }
    window.autoDodgeEnabled = false;
    let v188 = false;
    const vLN600 = 600;
    const vLN800 = 800;
    let vLN015 = 0;
    let v189 = null;
    let vLN016 = 0;
    let vLN017 = 0;
    let vA4 = [];

    function f65() {
        if (!v188) {
            return;
        }
        setTimeout(f65, 80);
        if (!window.autoDodgeEnabled) {
            return;
        }
        try {
            const vF386 = f38();
            if (!vF386) {
                return;
            }
            const vF354 = f35();
            const vF363 = f36(vF354);
            const v190 = vF354?.myAnimals?.[0];
            if (!vF363 || !v190) {
                return;
            }
            let vA5 = [];
            (vF363.entitiesList || []).forEach(p83 => {
                if (!p83 || p83.id === v190.id || !f34(p83)) {
                    return;
                }
                const v191 = p83.position?._x !== undefined ? p83.position._x : p83.position?.x;
                const v192 = p83.position?._y !== undefined ? p83.position._y : p83.position?.y;
                if (v191 == null || v192 == null) {
                    return;
                }
                const vF422 = f42(vF386.x, vF386.y, v191, v192);
                if (vF422 < vLN600) {
                    vA5.push({
                        x: v191,
                        y: v192,
                        dist: vF422
                    });
                }
            });
            if (vA5.length === 0) {
                v189 = null;
                vLN016 = 0;
                vA4 = [];
                return;
            }
            const v193 = Date.now();
            let v194 = false;
            if (v193 - vLN017 > 600) {
                vLN017 = v193;
                if (v189) {
                    const vF423 = f42(vF386.x, vF386.y, v189.x, v189.y);
                    if (vF423 < 20) {
                        vLN016++;
                        v194 = true;
                    } else {
                        vLN016 = 0;
                        vA4 = [];
                    }
                }
                v189 = {
                    x: vF386.x,
                    y: vF386.y
                };
            }
            let vLN018 = 0;
            let vLN019 = 0;
            vA5.forEach(p84 => {
                const v195 = vF386.x - p84.x;
                const v196 = vF386.y - p84.y;
                const v197 = Math.sqrt(v195 * v195 + v196 * v196);
                if (v197 > 0.01) {
                    const v198 = (vLN600 - p84.dist) / vLN600;
                    vLN018 += v195 / v197 * v198;
                    vLN019 += v196 / v197 * v198;
                }
            });
            let v199 = Math.sqrt(vLN018 * vLN018 + vLN019 * vLN019);
            if (v199 < 0.01) {
                vLN018 = 1;
                vLN019 = 0;
                v199 = 1;
            }
            vLN018 /= v199;
            vLN019 /= v199;
            let v200 = Math.atan2(vLN019, vLN018);
            if (v194 && vLN016 >= 1) {
                const vA6 = [Math.PI / 4, -Math.PI / 4, Math.PI / 2, -Math.PI / 2, Math.PI * 3 / 4, -Math.PI * 3 / 4];
                let vV200 = v200;
                let v201 = -Infinity;
                for (const v202 of vA6) {
                    const v203 = v200 + v202;
                    if (vA4.some(p85 => Math.abs(p85 - v203) < 0.3) && vLN016 < 5) {
                        continue;
                    }
                    let vLN020 = 0;
                    vA5.forEach(p86 => {
                        vLN020 -= Math.cos(v203) * (p86.x - vF386.x) + Math.sin(v203) * (p86.y - vF386.y);
                    });
                    if (vLN020 > v201) {
                        v201 = vLN020;
                        vV200 = v203;
                    }
                }
                v200 = vV200;
                vA4.push(v200);
                if (vA4.length > 8) {
                    vA4.shift();
                }
                if (vLN016 >= 5) {
                    v200 += Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2;
                    vLN016 = 0;
                    vA4 = [];
                }
            }
            const v204 = v193 - vLN015 > vLN800;
            if (v204) {
                vLN015 = v193;
            }
            f64(vF386.x + Math.cos(v200) * 2000, vF386.y + Math.sin(v200) * 2000, v204);
        } catch (e20) {}
    }

    function f66() {
        window.autoDodgeEnabled = true;
        v189 = null;
        vLN016 = 0;
        vA4 = [];
        if (!v188) {
            v188 = true;
            f65();
        }
        f4("Auto dodge enabled");
    }

    function f67() {
        window.autoDodgeEnabled = false;
        f4("Auto dodge disabled");
    }
    window.autoFarmActive = false;
    window.autoFarmMode = "nearest";
    window.autoFarmRange = 3000;
    window.autoFarmBoost = true;
    window.autoFarmEvolve = true;
    window.autoFarmAvoidPlayers = true;
    window.autoFarmAvoidDistance = 800;
    window.autoFarmStats = {
        collected: 0,
        startTime: 0
    };
    window.autoFarmPatrolPoints = [];
    window.autoFarmPatrolIndex = 0;
    window.autoFarmCurrentTarget = null;
    window.autoFarmTargetStartTime = 0;
    window.autoFarmSkipIds = new Set();
    window.autoFarmSkipClearTime = 0;
    window.autoFarmSkipAreas = [];
    const vLN4002 = 400;
    const vLN2 = 2;
    const vLN20000 = 20000;
    let vLN021 = 0;
    const vLN6002 = 600;

    function f68(p87, p88) {
        const v205 = Date.now();
        window.autoFarmSkipAreas = window.autoFarmSkipAreas.filter(p89 => v205 - p89.time < vLN20000);
        let v206 = window.autoFarmSkipAreas.find(p90 => f42(p87, p88, p90.x, p90.y) < vLN4002);
        if (v206) {
            v206.failCount++;
            v206.time = v205;
            if (v206.failCount >= vLN2) {
                v206.skipped = true;
                f4("Skipping unreachable food area");
            }
        } else {
            window.autoFarmSkipAreas.push({
                x: p87,
                y: p88,
                radius: vLN4002,
                time: v205,
                failCount: 1,
                skipped: false
            });
        }
    }

    function f69(p91, p92) {
        const v207 = Date.now();
        window.autoFarmSkipAreas = window.autoFarmSkipAreas.filter(p93 => v207 - p93.time < vLN20000);
        return window.autoFarmSkipAreas.some(p94 => p94.skipped && f42(p91, p92, p94.x, p94.y) < p94.radius);
    }

    function f70(p95) {
        p95 = p95 || window.autoFarmRange;
        try {
            const vF355 = f35();
            const vF364 = f36(vF355);
            const v208 = vF355?.myAnimals?.[0];
            if (!vF364 || !v208) {
                return null;
            }
            const v209 = v208.position._x !== undefined ? v208.position._x : v208.position.x;
            const v210 = v208.position._y !== undefined ? v208.position._y : v208.position.y;
            let v211 = null;
            let vInfinity = Infinity;
            (vF364.entitiesList || []).forEach(p96 => {
                if (!p96 || p96.id === v208.id || window.autoFarmSkipIds.has(p96.id)) {
                    return;
                }
                const v212 = p96.position?._x !== undefined ? p96.position._x : p96.position?.x;
                const v213 = p96.position?._y !== undefined ? p96.position._y : p96.position?.y;
                if (v212 == null || v213 == null || f34(p96) || f69(v212, v213)) {
                    return;
                }
                const vF424 = f42(v209, v210, v212, v213);
                if (vF424 < vInfinity && vF424 < p95) {
                    vInfinity = vF424;
                    v211 = {
                        id: p96.id,
                        x: v212,
                        y: v213,
                        distance: vF424,
                        entity: p96
                    };
                }
            });
            return v211;
        } catch (e21) {
            return null;
        }
    }

    function f71(p97) {
        p97 = p97 || window.autoFarmRange;
        try {
            const vF356 = f35();
            const vF365 = f36(vF356);
            const v214 = vF356?.myAnimals?.[0];
            if (!vF365 || !v214) {
                return [];
            }
            const v215 = v214.position._x !== undefined ? v214.position._x : v214.position.x;
            const v216 = v214.position._y !== undefined ? v214.position._y : v214.position.y;
            const vA7 = [];
            (vF365.entitiesList || []).forEach(p98 => {
                if (!p98 || p98.id === v214.id || window.autoFarmSkipIds.has(p98.id)) {
                    return;
                }
                const v217 = p98.position?._x !== undefined ? p98.position._x : p98.position?.x;
                const v218 = p98.position?._y !== undefined ? p98.position._y : p98.position?.y;
                if (v217 == null || v218 == null || f34(p98) || f69(v217, v218)) {
                    return;
                }
                const vF425 = f42(v215, v216, v217, v218);
                if (vF425 < p97) {
                    vA7.push({
                        id: p98.id,
                        x: v217,
                        y: v218,
                        distance: vF425,
                        entity: p98
                    });
                }
            });
            return vA7.sort((p99, p100) => p99.distance - p100.distance);
        } catch (e22) {
            return [];
        }
    }

    function f72(p101, p102) {
        const vF71 = f71(p102 || window.autoFarmRange);
        if (!vF71.length) {
            return null;
        }
        let v219 = null;
        let vLN022 = 0;
        vF71.forEach(p103 => {
            let vLN023 = 0;
            let vLN024 = 0;
            let vLN026 = 0;
            vF71.forEach(p104 => {
                if (f42(p103.x, p103.y, p104.x, p104.y) < (p101 || 500)) {
                    vLN023++;
                    vLN024 += p104.x;
                    vLN026 += p104.y;
                }
            });
            if (vLN023 > vLN022) {
                vLN022 = vLN023;
                v219 = {
                    x: vLN024 / vLN023,
                    y: vLN026 / vLN023,
                    foodCount: vLN023
                };
            }
        });
        return v219;
    }

    function f73() {
        if (!window.autoFarmAvoidPlayers) {
            return {
                x: 0,
                y: 0
            };
        }
        const vF387 = f38();
        if (!vF387) {
            return {
                x: 0,
                y: 0
            };
        }
        let vLN027 = 0;
        let vLN028 = 0;
        try {
            const vF357 = f35();
            const vF366 = f36(vF357);
            const v220 = vF357?.myAnimals?.[0];
            if (!vF366 || !v220) {
                return {
                    x: 0,
                    y: 0
                };
            }
            (vF366.entitiesList || []).forEach(p105 => {
                if (!p105 || p105.id === v220.id || !f34(p105)) {
                    return;
                }
                const v221 = p105.position?._x !== undefined ? p105.position._x : p105.position?.x;
                const v222 = p105.position?._y !== undefined ? p105.position._y : p105.position?.y;
                if (v221 == null || v222 == null) {
                    return;
                }
                const vF426 = f42(vF387.x, vF387.y, v221, v222);
                if (vF426 < window.autoFarmAvoidDistance) {
                    const v223 = vF387.x - v221;
                    const v224 = vF387.y - v222;
                    const v225 = Math.sqrt(v223 * v223 + v224 * v224);
                    const v226 = (window.autoFarmAvoidDistance - Math.max(vF426, 50)) / window.autoFarmAvoidDistance;
                    if (v225 > 0) {
                        vLN027 += v223 / v225 * v226 * 500;
                        vLN028 += v224 / v225 * v226 * 500;
                    }
                }
            });
        } catch (e23) {}
        return {
            x: vLN027,
            y: vLN028
        };
    }
    let vLN029 = 0;

    function f74() {
        if (!window.autoFarmEvolve) {
            return;
        }
        const v227 = Date.now();
        if (v227 - vLN029 < 5000) {
            return;
        }
        vLN029 = v227;
        const vF297 = f29();
        const vString = String(Math.floor(Math.random() * 9) + 1);
        const vO6 = {
            key: vString,
            code: "Digit" + vString,
            keyCode: vString.charCodeAt(0),
            which: vString.charCodeAt(0),
            bubbles: true,
            cancelable: true
        };
        [window, document, document.body, vF297].forEach(p106 => {
            if (!p106) {
                return;
            }
            try {
                p106.dispatchEvent(new KeyboardEvent("keydown", vO6));
                setTimeout(() => p106.dispatchEvent(new KeyboardEvent("keyup", vO6)), 50);
            } catch (e24) {}
        });
    }
    let v228 = false;
    let v229 = null;
    let vLN030 = 0;
    let vLN031 = 0;
    let vLN032 = 0;
    let vLN033 = 0;

    function f75(p107) {
        const v230 = Date.now();
        if (v230 - vLN031 < 1500) {
            return false;
        }
        vLN031 = v230;
        if (v229) {
            if (f42(p107.x, p107.y, v229.x, v229.y) < 25) {
                vLN030++;
                if (vLN030 >= 1 && window.autoFarmCurrentTarget) {
                    f68(window.autoFarmCurrentTarget.x, window.autoFarmCurrentTarget.y);
                    window.autoFarmSkipIds.add(window.autoFarmCurrentTarget.id);
                    window.autoFarmCurrentTarget = null;
                    window.autoFarmTargetStartTime = 0;
                    vLN030 = 0;
                }
                if (vLN030 >= 2) {
                    vLN030 = 0;
                    window.autoFarmCurrentTarget = null;
                    window.autoFarmTargetStartTime = 0;
                    const v231 = Math.random() * Math.PI * 2;
                    f64(p107.x + Math.cos(v231) * 1500, p107.y + Math.sin(v231) * 1500, true);
                    return true;
                }
            } else {
                vLN030 = 0;
            }
        }
        v229 = {
            x: p107.x,
            y: p107.y
        };
        return false;
    }

    function f76() {
        const vF388 = f38();
        if (!vF388) {
            return;
        }
        window.autoFarmPatrolPoints = [];
        for (let vLN034 = 0; vLN034 < 6; vLN034++) {
            const v232 = Math.PI * 2 * vLN034 / 6;
            window.autoFarmPatrolPoints.push({
                x: vF388.x + Math.cos(v232) * 2000,
                y: vF388.y + Math.sin(v232) * 2000
            });
        }
        window.autoFarmPatrolIndex = 0;
    }

    function f77() {
        if (!window.autoFarmActive) {
            v228 = false;
            return;
        }
        const v233 = Date.now();
        if (v233 - window.autoFarmSkipClearTime > 15000) {
            window.autoFarmSkipIds.clear();
            window.autoFarmSkipClearTime = v233;
        }
        if (window.autoFarmCurrentTarget && window.autoFarmTargetStartTime > 0 && v233 - window.autoFarmTargetStartTime > 1000) {
            f68(window.autoFarmCurrentTarget.x, window.autoFarmCurrentTarget.y);
            window.autoFarmSkipIds.add(window.autoFarmCurrentTarget.id);
            window.autoFarmCurrentTarget = null;
            window.autoFarmTargetStartTime = 0;
            setTimeout(f77, 100);
            return;
        }
        try {
            const vF389 = f38();
            if (!vF389) {
                window.autoFarmActive = false;
                v228 = false;
                const v234 = document.getElementById("autoFarmBtn");
                if (v234) {
                    v234.textContent = "Auto Farm";
                    v234.classList.remove("toggle-on");
                }
                return;
            }
            if (Math.random() < 0.015) {
                f74();
            }
            if (f75(vF389)) {
                setTimeout(f77, 100);
                return;
            }
            const vF73 = f73();
            if ((Math.abs(vF73.x) > 100 || Math.abs(vF73.y) > 100) && window.autoFarmAvoidPlayers) {
                const v235 = window.autoFarmBoost && v233 - vLN021 > vLN6002;
                if (v235) {
                    vLN021 = v233;
                }
                f64(vF389.x + vF73.x, vF389.y + vF73.y, v235);
                setTimeout(f77, 60);
                return;
            }
            let v236 = null;
            let v237 = null;
            let vInfinity2 = Infinity;
            if (window.autoFarmMode === "nearest") {
                const vF70 = f70();
                if (vF70) {
                    v236 = vF70.x + vF73.x * 0.3;
                    v237 = vF70.y + vF73.y * 0.3;
                    vInfinity2 = vF70.distance;
                    if (!window.autoFarmCurrentTarget || window.autoFarmCurrentTarget.id !== vF70.id) {
                        if (window.autoFarmCurrentTarget) {
                            window.autoFarmStats.collected++;
                        }
                        window.autoFarmCurrentTarget = vF70;
                        window.autoFarmTargetStartTime = v233;
                        vLN030 = 0;
                    }
                    if (vF70.distance < 40) {
                        v236 += (Math.random() - 0.5) * 80;
                        v237 += (Math.random() - 0.5) * 80;
                    }
                } else {
                    window.autoFarmCurrentTarget = null;
                    window.autoFarmTargetStartTime = 0;
                    if (v233 - vLN033 > 2500) {
                        vLN032 = Math.random() * Math.PI * 2;
                        vLN033 = v233;
                    }
                    v236 = vF389.x + Math.cos(vLN032) * 1000;
                    v237 = vF389.y + Math.sin(vLN032) * 1000;
                    vInfinity2 = 1000;
                }
            } else if (window.autoFarmMode === "cluster") {
                const vF72 = f72(500, window.autoFarmRange);
                if (vF72 && vF72.foodCount >= 2) {
                    v236 = vF72.x + vF73.x * 0.3;
                    v237 = vF72.y + vF73.y * 0.3;
                    vInfinity2 = f42(vF389.x, vF389.y, vF72.x, vF72.y);
                } else {
                    const vF702 = f70();
                    if (vF702) {
                        v236 = vF702.x;
                        v237 = vF702.y;
                        vInfinity2 = vF702.distance;
                        if (!window.autoFarmCurrentTarget || window.autoFarmCurrentTarget.id !== vF702.id) {
                            window.autoFarmCurrentTarget = vF702;
                            window.autoFarmTargetStartTime = v233;
                        }
                    } else {
                        window.autoFarmCurrentTarget = null;
                        window.autoFarmTargetStartTime = 0;
                        if (v233 - vLN033 > 2500) {
                            vLN032 = Math.random() * Math.PI * 2;
                            vLN033 = v233;
                        }
                        v236 = vF389.x + Math.cos(vLN032) * 1000;
                        v237 = vF389.y + Math.sin(vLN032) * 1000;
                        vInfinity2 = 1000;
                    }
                }
            } else if (window.autoFarmMode === "patrol") {
                if (!window.autoFarmPatrolPoints.length) {
                    f76();
                }
                const vF703 = f70(800);
                if (vF703) {
                    v236 = vF703.x;
                    v237 = vF703.y;
                    vInfinity2 = vF703.distance;
                    if (!window.autoFarmCurrentTarget || window.autoFarmCurrentTarget.id !== vF703.id) {
                        window.autoFarmCurrentTarget = vF703;
                        window.autoFarmTargetStartTime = v233;
                    }
                } else {
                    window.autoFarmCurrentTarget = null;
                    window.autoFarmTargetStartTime = 0;
                    const v238 = window.autoFarmPatrolPoints[window.autoFarmPatrolIndex];
                    if (v238) {
                        vInfinity2 = f42(vF389.x, vF389.y, v238.x, v238.y);
                        if (vInfinity2 < 200) {
                            window.autoFarmPatrolIndex = (window.autoFarmPatrolIndex + 1) % window.autoFarmPatrolPoints.length;
                        }
                        v236 = v238.x;
                        v237 = v238.y;
                    }
                }
            }
            if (v236 != null) {
                const v239 = window.autoFarmBoost && vInfinity2 > 350 && v233 - vLN021 > vLN6002;
                if (v239) {
                    vLN021 = v233;
                }
                f64(v236, v237, v239);
            }
        } catch (e25) {
            console.error("[AutoFarm]", e25);
        }
        setTimeout(f77, 60);
    }

    function f78(p108) {
        window.autoFarmMode = p108 || "nearest";
        window.autoFarmActive = true;
        window.autoFarmStats.startTime = Date.now();
        window.autoFarmStats.collected = 0;
        window.autoFarmCurrentTarget = null;
        window.autoFarmTargetStartTime = 0;
        window.autoFarmSkipIds.clear();
        window.autoFarmSkipAreas = [];
        window.autoFarmSkipClearTime = Date.now();
        v229 = null;
        vLN030 = 0;
        vLN031 = 0;
        vLN021 = 0;
        if (p108 === "patrol") {
            f76();
        }
        f4("Auto farm started (" + window.autoFarmMode + ")");
        if (!v228) {
            v228 = true;
            f77();
        }
    }

    function f79() {
        window.autoFarmActive = false;
        v228 = false;
        f4("Farm stopped. ~" + window.autoFarmStats.collected + " food in " + ((Date.now() - window.autoFarmStats.startTime) / 1000).toFixed(0) + "s");
    }
    document.addEventListener("keydown", p109 => {
        if (p109.target.matches("input,textarea,select")) {
            return;
        }
        if (p109.key === "F5") {
            p109.preventDefault();
            if (window.autoFarmActive) {
                f79();
                const v240 = document.getElementById("autoFarmBtn");
                if (v240) {
                    v240.textContent = "Auto Farm";
                    v240.classList.remove("toggle-on");
                }
            } else {
                const v241 = document.getElementById("farmModeSelect");
                f78(v241 ? v241.value : "nearest");
                const v242 = document.getElementById("autoFarmBtn");
                if (v242) {
                    v242.textContent = "Stop Farm";
                    v242.classList.add("toggle-on");
                }
            }
        }
    });

    function f80() {
        if (!v57 || !v57.minimap) {
            f4("Minimap not available");
            return;
        }
        if (v59) {
            v57.minimap.scale.set(1);
            v57.minimap.pivot.set(0, 0);
            v59 = false;
            f4("Minimap restored");
        } else {
            v57.minimap.scale.set(0.5);
            v57.minimap.pivot.set(-70, -45);
            v59 = true;
            f4("Small minimap enabled");
        }
    }
    let v243 = false;
    const vF5 = () => {
        if (v243) {
            return;
        }
        v243 = true;
        const vO7 = {};
        for (const v244 of Object.getOwnPropertyNames(Reflect)) {
            vO7[v244] = Reflect[v244];
        }
        const vProxy = Proxy;
        const v245 = Object.prototype.__lookupGetter__;
        const vF6 = (p110, p111, p112) => {
            const v246 = new vProxy(p110[p111], p112);
            v3.set(v246, p110[p111]);
            p110[p111] = v246;
        };
        vF6(Function.prototype, "toString", {
            apply(p113, p114, p115) {
                return vO7.apply(p113, v3.get(p114) || p114, p115);
            }
        });
        vF6(window, "Proxy", {
            construct(p116, p117) {
                return vO7.construct(p116, p117);
            }
        });
        vF6(vProxy, "revocable", {
            apply(p118, p119, p120) {
                return vO7.apply(p118, p119, p120);
            }
        });
        let vLN035 = 0;
        vF6(Function.prototype, "bind", {
            apply(p121, p122, p123) {
                try {
                    try {
                        if (v245.call(p123[0], "aboveBgPlatformsContainer") != null) {
                            return vO7.apply(p121, p122, p123);
                        }
                    } catch {}
                    if (p123[0] && p123[0].aboveBgPlatformsContainer != null) {
                        v57 = p123[0];
                        v55 = p123[0].game;
                        window.__cachedEM = null;
                        const vVF4 = vF4(v57);
                        const v247 = vVF4.filter(p124 => p124.startsWith("_0x"));
                        vO2.setFlash = Object.getOwnPropertyNames(v57.__proto__.__proto__).filter(p125 => p125.startsWith("_0x")).find(p126 => v57[p126] instanceof Function) || vO2.setFlash;
                        vO2.terrainManager = v247.find(p127 => typeof v57[p127]?.shadow !== "undefined") || vO2.terrainManager;
                        vO2.entityManager = v247.find(p128 => typeof v57[p128]?.entitiesList !== "undefined") || vO2.entityManager;
                        vO2.socketManager = vF4(v55).find(p129 => typeof v55[p129]?.sendBytePacket !== "undefined") || vO2.socketManager;
                        try {
                            v56 = document.getElementById("app")._vnode.appContext.config.globalProperties.$simpleState.states.find(p130 => p130._storeMeta.id === "game");
                        } catch {}
                        let v248;
                        try {
                            clearInterval(v248);
                        } catch {}
                        v248 = setInterval(() => {
                            try {
                                if (!v57?.myAnimals?.[0]) {
                                    return;
                                }
                                const v249 = v57.myAnimals[0];
                                if (v249.fadingTrail) {
                                    f3(Object.getPrototypeOf(v249.fadingTrail), "enable", {
                                        apply() {}
                                    });
                                }
                                if (v249.bubblesEmitter) {
                                    Object.defineProperty(Object.getPrototypeOf(v249.bubblesEmitter), "emit", {
                                        set: () => {}
                                    });
                                }
                                clearInterval(v248);
                            } catch {}
                        }, 200);
                        if (vLN035 < Date.now() - 3000) {
                            f4("Client loaded");
                            vLN035 = Date.now();
                        }
                    }
                } catch {}
                return vO7.apply(p121, p122, p123);
            }
        });
    };
    const vF7 = () => {
        if (v58) {
            return;
        }
        if (!v57) {
            setTimeout(vF7, 500);
            return;
        }
        try {
            if (v57.terrainManager && v57.terrainManager.shadow) {
                v57.terrainManager.shadow.setShadowSize(1000000);
                v57.terrainManager.shadow.setShadowSize = () => {};
            } else {
                for (let v250 in v57) {
                    if (v57[v250] && v57[v250].shadow) {
                        v57[v250].shadow.setShadowSize(1000000);
                        v57[v250].shadow.setShadowSize = () => {};
                    }
                }
            }
            if (typeof v57.setFlash === "function") {
                v57.setFlash = () => {};
            } else {
                for (let v251 of Object.getOwnPropertyNames(v57.__proto__)) {
                    if (v251.startsWith("_0x") && typeof v57[v251] === "function") {
                        v57[v251] = () => {};
                    }
                }
            }
            setInterval(() => {
                try {
                    v55.viewport.clampZoom({
                        minWidth: 0,
                        maxWidth: 10000000
                    });
                    v55.viewport.plugins.plugins.clamp = null;
                    v55.viewport.plugins.plugins["clamp-zoom"] = null;
                } catch {}
            }, 300);
            f4("Astra-Vision active");
        } catch (e26) {
            console.error("AstraVision Error:", e26);
        }
        v58 = true;
    };

    function f81(p131) {
        const v252 = document.createElement("div");
        v252.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:100001;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;";
        v252.innerHTML = "<div style=\"background:#1a1a1a;padding:32px;border-radius:8px;text-align:center;max-width:400px;width:90%;border:1px solid #333;\">\n      <div style=\"color:#e0e0e0;font-size:18px;font-weight:600;margin-bottom:16px;\">Halloween Access Code</div>\n      <input id=\"hwCodeInput\" type=\"text\" placeholder=\"Enter code...\" style=\"background:#111;border:1px solid #333;color:#e0e0e0;border-radius:4px;padding:10px;font-size:14px;text-align:center;width:100%;box-sizing:border-box;margin-bottom:16px;outline:none;\">\n      <div style=\"display:flex;gap:8px;\">\n        <button id=\"hwCancelBtn\" style=\"flex:1;background:#222;color:#888;border:1px solid #333;border-radius:4px;padding:10px;cursor:pointer;\">Cancel</button>\n        <button id=\"hwSubmitBtn\" style=\"flex:1;background:#ff6600;color:#fff;border:none;border-radius:4px;padding:10px;cursor:pointer;font-weight:600;\">Redeem</button>\n      </div></div>";
        document.body.appendChild(v252);
        setTimeout(() => {
            v252.style.opacity = "1";
        }, 10);
        const v253 = v252.querySelector("#hwCodeInput");
        const vF8 = () => {
            v252.style.opacity = "0";
            setTimeout(() => v252.remove(), 300);
        };
        v252.querySelector("#hwSubmitBtn").onclick = () => {
            const v254 = v253.value.trim();
            if (v254 === "HappyHalloween9" || v254 === "TrickOrTreat9") {
                localStorage.setItem("halloweenUnlocked", "true");
                f4("Halloween theme unlocked");
                vF8();
                p131(true);
            } else {
                v253.style.borderColor = "#ff0000";
                setTimeout(() => {
                    v253.style.borderColor = "#333";
                }, 500);
                f4("Invalid code");
            }
        };
        v252.querySelector("#hwCancelBtn").onclick = () => {
            vF8();
            p131(false);
        };
        v253.addEventListener("keypress", p132 => {
            if (p132.key === "Enter") {
                v252.querySelector("#hwSubmitBtn").click();
            }
        });
        v253.focus();
    }

    function f82(p133) {
        let v255;
        let v256;
        let v257 = false;
        let v258 = false;
        p133.addEventListener("mousedown", p134 => {
            if (["BUTTON", "INPUT", "TEXTAREA", "SELECT", "A", "LABEL"].includes(p134.target.tagName)) {
                return;
            }
            if (p134.target.closest("button,input,textarea,select,label")) {
                return;
            }
            v257 = true;
            v258 = false;
            v255 = p134.clientX - p133.getBoundingClientRect().left;
            v256 = p134.clientY - p133.getBoundingClientRect().top;
            p133.style.transition = "none";
            const vF9 = p135 => {
                if (!v258 && (Math.abs(p135.clientX - p134.clientX) > 5 || Math.abs(p135.clientY - p134.clientY) > 5)) {
                    v258 = true;
                }
                if (v257) {
                    p133.style.left = p135.clientX - v255 + "px";
                    p133.style.top = p135.clientY - v256 + "px";
                    p133.style.bottom = "auto";
                    p133.style.right = "auto";
                }
            };
            const vF10 = () => {
                v257 = false;
                p133.style.transition = "";
                document.removeEventListener("mousemove", vF9);
                document.removeEventListener("mouseup", vF10);
            };
            document.addEventListener("mousemove", vF9);
            document.addEventListener("mouseup", vF10);
        });
        p133.addEventListener("click", p136 => {
            if (v258) {
                p136.stopImmediatePropagation();
            }
        });
    }

    function f83(p137) {
        const v259 = document.documentElement;
        const v260 = JSON.parse(localStorage.getItem("customThemes") || "{}");
        const vO8 = {
            grey: {
                acc: "#888888",
                accH: "#aaaaaa",
                accRGB: "136,136,136",
                text: "#e0e0e0",
                textSec: "#888",
                bg1: "#1a1a1a",
                bg2: "#242424",
                bg3: "#2a2a2a",
                border: "#333",
                hover: "#2e2e2e"
            },
            blue: {
                acc: "#4fc3f7",
                accH: "#81d4fa",
                accRGB: "79,195,247",
                text: "#e0e0e0",
                textSec: "#888",
                bg1: "#1a1a1a",
                bg2: "#242424",
                bg3: "#2a2a2a",
                border: "#333",
                hover: "#2e2e2e"
            },
            red: {
                acc: "#ef5350",
                accH: "#e57373",
                accRGB: "239,83,80",
                text: "#e0e0e0",
                textSec: "#888",
                bg1: "#1a1a1a",
                bg2: "#242424",
                bg3: "#2a2a2a",
                border: "#333",
                hover: "#2e2e2e"
            },
            green: {
                acc: "#66bb6a",
                accH: "#81c784",
                accRGB: "102,187,106",
                text: "#e0e0e0",
                textSec: "#888",
                bg1: "#1a1a1a",
                bg2: "#242424",
                bg3: "#2a2a2a",
                border: "#333",
                hover: "#2e2e2e"
            },
            pink: {
                acc: "#f06292",
                accH: "#f48fb1",
                accRGB: "240,98,146",
                text: "#e0e0e0",
                textSec: "#888",
                bg1: "#1a1a1a",
                bg2: "#242424",
                bg3: "#2a2a2a",
                border: "#333",
                hover: "#2e2e2e"
            },
            starwars: {
                acc: "#ffd740",
                accH: "#ffe082",
                accRGB: "255,215,64",
                text: "#e0e0e0",
                textSec: "#888",
                bg1: "#1a1a1a",
                bg2: "#242424",
                bg3: "#2a2a2a",
                border: "#333",
                hover: "#2e2e2e"
            },
            kfc: {
                acc: "#f44336",
                accH: "#e57373",
                accRGB: "244,67,54",
                text: "#e0e0e0",
                textSec: "#888",
                bg1: "#1a1a1a",
                bg2: "#242424",
                bg3: "#2a2a2a",
                border: "#333",
                hover: "#2e2e2e"
            },
            halloween: {
                acc: "#ff6600",
                accH: "#ff8833",
                accRGB: "255,102,0",
                text: "#e0e0e0",
                textSec: "#888",
                bg1: "#1a1a1a",
                bg2: "#242424",
                bg3: "#2a2a2a",
                border: "#333",
                hover: "#2e2e2e"
            },
            ...v260
        };
        const v261 = vO8[p137] ? p137 : "grey";
        const v262 = vO8[v261];
        Object.entries({
            "--acc": v262.acc,
            "--acc-h": v262.accH,
            "--acc-rgb": v262.accRGB,
            "--text": v262.text,
            "--text-sec": v262.textSec,
            "--bg1": v262.bg1,
            "--bg2": v262.bg2,
            "--bg3": v262.bg3,
            "--bdr": v262.border,
            "--hvr": v262.hover
        }).forEach(([v263, v264]) => v259.style.setProperty(v263, v264));
        localStorage.setItem("theme", v261);
    }

    function f84() {
        const v265 = localStorage.getItem("bgUrl") || "";
        if (!v265) {
            return;
        }
        const vF11 = () => {
            const v266 = document.querySelector(".home-bg");
            if (v266) {
                v266.style.setProperty("background-image", "url(\"" + v265 + "\")", "important");
            }
        };
        if (!document.querySelector(".home-bg")) {
            const vSetInterval2 = setInterval(() => {
                if (document.querySelector(".home-bg")) {
                    clearInterval(vSetInterval2);
                    vF11();
                }
            }, 100);
        } else {
            vF11();
        }
    }

    function f85() {
        const v267 = document.createElement("style");
        v267.textContent = "\n      .ast-panel{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg1,#1a1a1a);color:var(--text,#e0e0e0);border-radius:6px;position:fixed;z-index:99999;user-select:none;cursor:move;font-size:13px;min-width:220px;overflow:hidden;}\n      .ast-header{background:var(--header-bg,var(--bg2,#242424));padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--bdr,#333);}\n      .ast-header-title{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--header-title,var(--acc,#888));}\n      .ast-header-min{background:none;border:none;color:var(--text-sec,#888);font-size:16px;cursor:pointer;padding:0 4px;line-height:1;}\n      .ast-header-min:hover{color:var(--text,#e0e0e0);}\n      .ast-body{padding:8px 12px 12px 12px;}\n      .ast-section-label{font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--section-label,var(--text-sec,#888));padding:8px 0 4px 2px;display:block;}\n      .ast-btn{display:block;width:100%;background:var(--btn-bg,var(--bg2,#242424));color:var(--btn-text,var(--text,#e0e0e0));border:none;border-radius:4px;padding:8px 10px;font-size:12px;font-weight:500;cursor:pointer;text-align:left;transition:background .12s;margin-bottom:3px;font-family:inherit;position:relative;}\n      .ast-btn:hover:not(:disabled){background:var(--btn-hover,var(--hvr,#2e2e2e));}\n      .ast-btn:disabled{opacity:.35;cursor:not-allowed;}\n      .ast-btn.toggle-on{color:var(--acc,#888);}\n      .ast-btn.toggle-on::before{content:'';position:absolute;left:0;top:4px;bottom:4px;width:2px;background:var(--acc,#888);border-radius:1px;}\n      .ast-btn.patched{opacity:.25;text-decoration:line-through;cursor:not-allowed;}\n      .ast-toggle-row{display:flex;align-items:center;justify-content:space-between;padding:5px 2px;font-size:12px;}\n      .ast-toggle-row label{color:var(--text,#e0e0e0);cursor:pointer;}\n      .ast-switch{position:relative;width:32px;height:18px;flex-shrink:0;}\n      .ast-switch input{opacity:0;width:0;height:0;position:absolute;}\n      .ast-switch .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:var(--switch-bg,#333);border-radius:9px;transition:background .2s;}\n      .ast-switch .slider::before{content:'';position:absolute;height:14px;width:14px;left:2px;bottom:2px;background:var(--switch-knob,#888);border-radius:50%;transition:transform .2s,background .2s;}\n      .ast-switch input:checked+.slider{background:var(--switch-active-bg,rgba(var(--acc-rgb,136,136,136),.3));}\n      .ast-switch input:checked+.slider::before{transform:translateX(14px);background:var(--acc,#888);}\n      .ast-select{width:100%;background:var(--input-bg,var(--bg2,#242424));color:var(--input-text,var(--text,#e0e0e0));border:1px solid var(--input-border,var(--bdr,#333));border-radius:4px;padding:6px 8px;font-size:12px;cursor:pointer;outline:none;font-family:inherit;margin-bottom:3px;appearance:none;}\n      .ast-select:focus{border-color:var(--acc,#888);}\n      .ast-input{background:var(--input-bg,var(--bg2,#242424));color:var(--input-text,var(--text,#e0e0e0));border:1px solid var(--input-border,var(--bdr,#333));border-radius:4px;padding:6px 8px;font-size:12px;outline:none;font-family:inherit;}\n      .ast-input:focus{border-color:var(--acc,#888);}\n      .ast-input::placeholder{color:var(--placeholder,#555);}\n      .ast-textarea{background:var(--input-bg,var(--bg2,#242424));color:var(--input-text,var(--text,#e0e0e0));border:1px solid var(--input-border,var(--bdr,#333));border-radius:4px;padding:8px;font-size:12px;outline:none;font-family:inherit;resize:none;width:100%;box-sizing:border-box;}\n      .ast-textarea:focus{border-color:var(--acc,#888);}\n      .ast-textarea::placeholder{color:var(--placeholder,#555);}\n      .ast-key-row{display:flex;align-items:center;justify-content:space-between;padding:4px 2px;font-size:12px;margin-bottom:3px;}\n      .ast-key-row span{color:var(--text,#e0e0e0);}\n      .ast-key-capture{background:var(--key-bg,var(--bg2,#242424));border:1px solid var(--input-border,var(--bdr,#333));color:var(--key-text,var(--acc,#888));border-radius:4px;padding:4px 10px;font-size:11px;text-align:center;min-width:50px;cursor:pointer;outline:none;font-family:'Consolas',monospace;font-weight:600;}\n      .ast-key-capture:focus{border-color:var(--acc,#888);}\n      .ast-row{display:flex;align-items:center;gap:6px;margin-bottom:4px;}\n      .ast-row .ast-input{flex:1;}\n      .ast-credits{padding-top:8px;font-size:10px;color:var(--muted,#555);line-height:1.5;text-align:center;}\n      .ast-sep{height:1px;background:var(--bdr,#333);margin:6px 0;}\n      .ast-update-list{margin:0;padding-left:16px;font-size:11px;color:var(--list-text,var(--text-sec,#888));line-height:1.6;}\n      .ast-update-list li{margin-bottom:4px;}\n      div.sidebar.left>div.ad-block{opacity:0!important;pointer-events:none!important;display:none!important;}\n      div.sidebar.left>a{display:none!important;}\n      div.sidebar.left{max-width:30vw;width:21rem;bottom:0!important;}\n    ";
        document.head.appendChild(v267);
    }

    function f86() {
        const v268 = document.createElement("div");
        v268.id = "deep-tools-panel";
        v268.className = "ast-panel";
        v268.style.cssText = "bottom:20px;right:20px;width:230px;";
        v268.innerHTML = "\n      <div class=\"ast-header\"><span class=\"ast-header-title\">Astraphobia Client</span><button class=\"ast-header-min\" id=\"mainMin\">−</button></div>\n      <div class=\"ast-body\" id=\"mainBody\">\n                    <span class=\"ast-section-label\">Autofill Name</span>\n        <div class=\"ast-row\" style=\"margin-bottom:6px;\">\n          <input class=\"ast-input\" type=\"text\" id=\"savedNameDisplay\" placeholder=\"Enter name...\" style=\"flex:1;\">\n          <button class=\"ast-btn\" id=\"setNameBtn\" style=\"width:40px;padding:6px 5px;margin:0;flex-shrink:0;text-align:center;\">Set</button>\n          <button class=\"ast-btn\" id=\"clearNameBtn\" style=\"width:30px;padding:6px 5px;margin:0;flex-shrink:0;text-align:center;\">✕</button>\n        </div>\n        <span class=\"ast-section-label\">Chat</span>\n        <textarea class=\"ast-textarea\" id=\"chatMsg\" placeholder=\"Message...\" rows=\"2\"></textarea>\n        <button class=\"ast-btn\" id=\"sendBtn\">Send Chat</button>\n        <div class=\"ast-row\" style=\"margin-top:4px;\">\n          <input class=\"ast-input\" type=\"number\" id=\"delayInput\" min=\"1\" max=\"300\" value=\"10\" style=\"width:50px;text-align:center;\">\n          <span style=\"font-size:11px;color:#888;\">sec</span>\n          <button class=\"ast-btn\" id=\"autoChatBtn\" style=\"flex:1;margin-bottom:0;\">Auto Chat</button>\n        </div>\n        <div class=\"ast-sep\"></div>\n        <span class=\"ast-section-label\">Tools</span>\n        <button class=\"ast-btn\" id=\"patchBtn\">Special Characters</button>\n        <button class=\"ast-btn\" id=\"spoofBtn\">Spoof Username</button>\n        <button class=\"ast-btn\" id=\"spinBtn\">Auto Spin</button>\n        <div class=\"ast-key-row\"><span>Spin key</span><input class=\"ast-key-capture\" id=\"spinKeyInput\" type=\"text\" placeholder=\"...\" readonly></div>\n        <div class=\"ast-sep\"></div>\n        <span class=\"ast-section-label\">Turn Controls</span>\n        <div class=\"ast-key-row\">\n          <span>Turn Left</span>\n          <input class=\"ast-key-capture\" id=\"turnLeftKeyInput\" type=\"text\" value=\"Q\" readonly>\n        </div>\n        <div class=\"ast-key-row\">\n          <span>Turn Right</span>\n          <input class=\"ast-key-capture\" id=\"turnRightKeyInput\" type=\"text\" value=\"E\" readonly>\n        </div>\n        <div class=\"ast-credits\">Made by Astraphobia</div>\n      </div>";
        document.body.appendChild(v268);
        const v269 = v268.querySelector("#mainBody");
        let v270 = false;
        v268.querySelector("#mainMin").onclick = p138 => {
            p138.stopPropagation();
            v270 = !v270;
            v269.style.display = v270 ? "none" : "block";
            v268.querySelector("#mainMin").textContent = v270 ? "+" : "−";
        };
        v268.querySelector("#sendBtn").onclick = () => {
            const v271 = v268.querySelector("#chatMsg").value;
            if (v271) {
                f10(v271);
            }
        };
        const v272 = v268.querySelector("#autoChatBtn");
        v272.onclick = () => {
            const v273 = v268.querySelector("#chatMsg").value;
            const v274 = parseInt(v268.querySelector("#delayInput").value) || 10;
            if (!v273) {
                f4("Enter a message first");
                return;
            }
            if (v14) {
                f9();
                v272.textContent = "Auto Chat";
                v272.classList.remove("toggle-on");
            } else {
                f8(v273, v274);
                v272.textContent = "Stop Chat";
                v272.classList.add("toggle-on");
            }
        };
        const v275 = v268.querySelector("#patchBtn");
        v275.onclick = () => {
            f11();
            v275.textContent = "Special Chars Active";
            v275.disabled = true;
            v275.classList.add("toggle-on");
        };
        v268.querySelector("#spoofBtn").onclick = () => {
            const vF12 = f(8);
            if (f2(".play-game .el-input__inner", vF12)) {
                f4("Name spoofed");
            } else if (f2(".new-tribe .el-input__inner", vF12)) {
                f4("Tribe name spoofed");
            } else {
                f4("No name input found");
            }
        };
        const v276 = v268.querySelector("#spinBtn");
        v276.onclick = () => {
            f32();
            v276.textContent = v46 ? "Stop Spin" : "Auto Spin";
            v276.classList.toggle("toggle-on", !!v46);
        };
        const v277 = v268.querySelector("#spinKeyInput");
        let v278 = null;
        v277.addEventListener("keydown", p139 => {
            p139.preventDefault();
            v278 = p139.code || p139.key;
            v277.value = v278.replace("Key", "").toUpperCase();
        });
        document.addEventListener("keydown", p140 => {
            if (v278 && p140.code === v278 && !p140.target.matches("input,textarea,button,select")) {
                p140.preventDefault();
                f32();
                v276.textContent = v46 ? "Stop Spin" : "Auto Spin";
                v276.classList.toggle("toggle-on", !!v46);
            }
        });
        const v279 = v268.querySelector("#turnLeftKeyInput");
        const v280 = v268.querySelector("#turnRightKeyInput");
        v279.value = vLSQ.toUpperCase();
        v280.value = vLSE.toUpperCase();
        v279.addEventListener("keydown", p141 => {
            p141.preventDefault();
            p141.stopPropagation();
            vLSQ = p141.key;
            v279.value = p141.key.length === 1 ? p141.key.toUpperCase() : p141.key;
        });
        v280.addEventListener("keydown", p142 => {
            p142.preventDefault();
            p142.stopPropagation();
            vLSE = p142.key;
            v280.value = p142.key.length === 1 ? p142.key.toUpperCase() : p142.key;
        });
        const v281 = v268.querySelector("#savedNameDisplay");
        const v282 = v268.querySelector("#setNameBtn");
        const v283 = v268.querySelector("#clearNameBtn");
        if (v281) {
            v281.value = localStorage.getItem("autofill_name") || "";
        }
        if (v282) {
            v282.onclick = () => {
                const v284 = v281.value.trim();
                if (v284) {
                    localStorage.setItem("autofill_name", v284);
                    v10 = false;
                    f6();
                    f4("Name saved: " + v284);
                }
            };
        }
        if (v283) {
            v283.onclick = () => {
                localStorage.removeItem("autofill_name");
                v10 = false;
                if (v281) {
                    v281.value = "";
                }
                f4("Autofill cleared");
            };
        }
        f82(v268);
        return v268;
    }

    function f87() {
        const v285 = document.createElement("div");
        v285.id = "vision-panel";
        v285.className = "ast-panel";
        v285.style.cssText = "top:20px;right:20px;width:230px;";
        v285.innerHTML = "\n      <div class=\"ast-header\"><span class=\"ast-header-title\">Astraphobia Client</span><button class=\"ast-header-min\" id=\"visionMin\">−</button></div>\n      <div class=\"ast-body\" id=\"visionBody\">\n        <span class=\"ast-section-label\">Vision</span>\n        <button class=\"ast-btn patched\" id=\"thresherBtn\" disabled>Thresher Boost (Patched)</button>\n        <button class=\"ast-btn\" id=\"astraVisionBtn\">Astra-Vision</button>\n        <button class=\"ast-btn\" id=\"smallMinimapBtn\">Small Minimap</button>\n        <div class=\"ast-sep\"></div>\n        <span class=\"ast-section-label\">ESP</span>\n        <button class=\"ast-btn\" id=\"espBtn\">ESP</button>\n        <select class=\"ast-select\" id=\"espModeSelect\"><option value=\"players\">Players</option><option value=\"food\">Food</option></select>\n        <button class=\"ast-btn\" id=\"trackNearestBtn\">Track Nearest (F3)</button>\n        <button class=\"ast-btn\" id=\"untrackBtn\">Untrack (F4)</button>\n        <div class=\"ast-sep\"></div>\n        <button class=\"ast-btn\" id=\"espColorsToggleBtn\" style=\"display:flex;align-items:center;justify-content:space-between;\">\n          <span style=\"font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-sec,#888);\">ESP Colors</span>\n          <span id=\"espColorsArrow\" style=\"color:var(--text-sec,#888);font-size:12px;\">▼</span>\n        </button>\n        <div id=\"espColorsSection\" style=\"display:none;\">\n          <div class=\"ast-key-row\"><span>Close (&lt;500)</span><input type=\"color\" id=\"espColorClose\" value=\"#ff0000\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n          <div class=\"ast-key-row\"><span>Medium (&lt;1500)</span><input type=\"color\" id=\"espColorMedium\" value=\"#ffff00\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n          <div class=\"ast-key-row\"><span>Far (&lt;3000)</span><input type=\"color\" id=\"espColorFar\" value=\"#00ffff\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n          <div class=\"ast-key-row\"><span>Very Far</span><input type=\"color\" id=\"espColorVeryFar\" value=\"#00ff00\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n          <div class=\"ast-key-row\"><span>Tracked</span><input type=\"color\" id=\"espColorTracked\" value=\"#ff00ff\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n          <div class=\"ast-key-row\"><span>Food Close</span><input type=\"color\" id=\"espColorFoodClose\" value=\"#00ff00\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n          <div class=\"ast-key-row\"><span>Food Medium</span><input type=\"color\" id=\"espColorFoodMedium\" value=\"#88ff88\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n          <div class=\"ast-key-row\"><span>Food Far</span><input type=\"color\" id=\"espColorFoodFar\" value=\"#44cc44\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n        </div>\n      </div>";
        document.body.appendChild(v285);
        const v286 = v285.querySelector("#visionBody");
        let v287 = false;
        v285.querySelector("#visionMin").onclick = p143 => {
            p143.stopPropagation();
            v287 = !v287;
            v286.style.display = v287 ? "none" : "block";
            v285.querySelector("#visionMin").textContent = v287 ? "+" : "−";
        };
        v285.querySelector("#thresherBtn").onclick = p144 => {
            p144.preventDefault();
            f4("Thresher boost has been patched");
        };
        const v288 = v285.querySelector("#astraVisionBtn");
        v288.onclick = () => {
            if (v58) {
                f4("Already active");
                return;
            }
            vF5();
            if (!v57) {
                f4("Loading... click again in 2s");
                setTimeout(() => {
                    vF7();
                    v288.textContent = "Astra-Vision ✓";
                    v288.classList.add("toggle-on");
                    v288.disabled = true;
                }, 2000);
                return;
            }
            vF7();
            v288.textContent = "Astra-Vision ✓";
            v288.classList.add("toggle-on");
            v288.disabled = true;
        };
        const v289 = v285.querySelector("#smallMinimapBtn");
        v289.onclick = () => {
            vF5();
            if (!v57) {
                f4("Not in game yet");
                return;
            }
            if (!v57.minimap) {
                f4("Minimap not available");
                return;
            }
            f80();
            v289.textContent = v59 ? "Minimap: Small" : "Small Minimap";
            v289.classList.toggle("toggle-on", v59);
        };
        const v290 = v285.querySelector("#espBtn");
        v290.onclick = () => {
            f60();
            v290.textContent = window.espEnabled ? "ESP ✓" : "ESP";
            v290.classList.toggle("toggle-on", window.espEnabled);
        };
        const v291 = v285.querySelector("#espModeSelect");
        v291.value = window.espMode || "players";
        v291.onchange = p145 => {
            window.espMode = p145.target.value;
            f4("ESP: " + p145.target.value);
        };
        v285.querySelector("#trackNearestBtn").onclick = () => f61();
        v285.querySelector("#untrackBtn").onclick = () => f62();
        const v292 = v285.querySelector("#espColorsToggleBtn");
        const v293 = v285.querySelector("#espColorsSection");
        const v294 = v285.querySelector("#espColorsArrow");
        let v295 = false;
        v292.onclick = () => {
            v295 = !v295;
            v293.style.display = v295 ? "block" : "none";
            v294.textContent = v295 ? "▲" : "▼";
        };
        const vO9 = {
            espColorClose: "close",
            espColorMedium: "medium",
            espColorFar: "far",
            espColorVeryFar: "veryFar",
            espColorTracked: "tracked",
            espColorFoodClose: "foodClose",
            espColorFoodMedium: "foodMedium",
            espColorFoodFar: "foodFar"
        };
        Object.entries(vO9).forEach(([v296, v297]) => {
            const v298 = v285.querySelector("#" + v296);
            if (v298) {
                v298.addEventListener("input", p146 => {
                    window.espColors[v297] = p146.target.value;
                });
            }
        });
        f82(v285);
        return v285;
    }

    function f88() {
        const v299 = document.createElement("div");
        v299.id = "combat-panel";
        v299.className = "ast-panel";
        v299.style.cssText = "top:20px;left:260px;width:230px;";
        v299.innerHTML = "\n      <div class=\"ast-header\"><span class=\"ast-header-title\">Astraphobia Client</span><button class=\"ast-header-min\" id=\"combatMin\">−</button></div>\n      <div class=\"ast-body\" id=\"combatBody\">\n        <span class=\"ast-section-label\">Combat</span>\n        <button class=\"ast-btn\" id=\"lockBtn\">Lock Nearest</button>\n        <div class=\"ast-key-row\"><span>Lock Key</span><input class=\"ast-key-capture\" id=\"lockKeyInput\" type=\"text\" value=\"T\" readonly></div>\n        <div class=\"ast-sep\"></div>\n        <span class=\"ast-section-label\">Tracking</span>\n        <div class=\"ast-key-row\" style=\"margin-top:4px;\">\n          <span>Trail Color</span>\n          <input type=\"color\" id=\"trailColorPicker\" value=\"#ff9600\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;background:var(--bg2,#242424);cursor:pointer;padding:0;\">\n        </div>\n        <div class=\"ast-key-row\"><span>Trace Key (re-targets)</span><input class=\"ast-key-capture\" id=\"traceKeyInput\" type=\"text\" value=\"H\" readonly></div>\n      </div>";
        document.body.appendChild(v299);
        const v300 = v299.querySelector("#combatBody");
        let v301 = false;
        v299.querySelector("#combatMin").onclick = p147 => {
            p147.stopPropagation();
            v301 = !v301;
            v300.style.display = v301 ? "none" : "block";
            v299.querySelector("#combatMin").textContent = v301 ? "+" : "−";
        };
        const v302 = v299.querySelector("#lockBtn");
        v302.onclick = () => f46();
        const v303 = v299.querySelector("#lockKeyInput");
        v303.value = window.lockKey.toUpperCase();
        v303.addEventListener("keydown", p148 => {
            p148.preventDefault();
            p148.stopPropagation();
            window.lockKey = p148.key;
            v303.value = p148.key.length === 1 ? p148.key.toUpperCase() : p148.key;
        });
        const v304 = v299.querySelector("#trailColorPicker");
        v304.addEventListener("input", p149 => {
            const v305 = p149.target.value;
            window.entityTrailColor = {
                r: parseInt(v305.slice(1, 3), 16),
                g: parseInt(v305.slice(3, 5), 16),
                b: parseInt(v305.slice(5, 7), 16)
            };
        });
        const v306 = v299.querySelector("#traceKeyInput");
        v306.value = window.entityTraceKey.toUpperCase();
        v306.addEventListener("keydown", p150 => {
            p150.preventDefault();
            p150.stopPropagation();
            window.entityTraceKey = p150.key.toLowerCase();
            v306.value = p150.key.length === 1 ? p150.key.toUpperCase() : p150.key;
        });
        f82(v299);
        return v299;
    }

    function f89() {
        const v307 = document.createElement("div");
        v307.id = "automation-panel";
        v307.className = "ast-panel";
        v307.style.cssText = "bottom:20px;left:260px;width:230px;";
        v307.innerHTML = "\n      <div class=\"ast-header\"><span class=\"ast-header-title\">Astraphobia Client</span><button class=\"ast-header-min\" id=\"autoMin\">−</button></div>\n      <div class=\"ast-body\" id=\"autoBody\">\n        <span class=\"ast-section-label\">Automation</span>\n        <button class=\"ast-btn\" id=\"autoDodgeBtn\">Auto Dodge</button>\n        <button class=\"ast-btn\" id=\"autoFarmBtn\">Auto Farm (F5)</button>\n        <select class=\"ast-select\" id=\"farmModeSelect\" style=\"margin-top:4px;\">\n          <option value=\"nearest\">Nearest Food</option>\n          <option value=\"cluster\">Food Clusters</option>\n          <option value=\"patrol\">Patrol Route</option>\n        </select>\n        <div class=\"ast-toggle-row\"><span>Boost</span><div class=\"ast-switch\"><input type=\"checkbox\" id=\"farmBoostToggle\" checked><span class=\"slider\"></span></div></div>\n        <div class=\"ast-toggle-row\"><span>Auto Evolve</span><div class=\"ast-switch\"><input type=\"checkbox\" id=\"farmEvolveToggle\" checked><span class=\"slider\"></span></div></div>\n        <div class=\"ast-toggle-row\"><span>Avoid Players</span><div class=\"ast-switch\"><input type=\"checkbox\" id=\"farmAvoidToggle\" checked><span class=\"slider\"></span></div></div>\n      </div>";
        document.body.appendChild(v307);
        const v308 = v307.querySelector("#autoBody");
        let v309 = false;
        v307.querySelector("#autoMin").onclick = p151 => {
            p151.stopPropagation();
            v309 = !v309;
            v308.style.display = v309 ? "none" : "block";
            v307.querySelector("#autoMin").textContent = v309 ? "+" : "−";
        };
        const v310 = v307.querySelector("#autoDodgeBtn");
        v310.onclick = () => {
            if (window.autoDodgeEnabled) {
                f67();
                v310.textContent = "Auto Dodge";
                v310.classList.remove("toggle-on");
            } else {
                f66();
                v310.textContent = "Dodging ✓";
                v310.classList.add("toggle-on");
            }
        };
        const v311 = v307.querySelector("#autoFarmBtn");
        v311.id = "autoFarmBtn";
        const v312 = v307.querySelector("#farmModeSelect");
        v311.onclick = () => {
            if (window.autoFarmActive) {
                f79();
                v311.textContent = "Auto Farm (F5)";
                v311.classList.remove("toggle-on");
            } else {
                f78(v312.value);
                v311.textContent = "Stop Farm (F5)";
                v311.classList.add("toggle-on");
            }
        };
        v312.onchange = p152 => {
            if (window.autoFarmActive) {
                window.autoFarmMode = p152.target.value;
                if (p152.target.value === "patrol") {
                    f76();
                }
                f4("Farm: " + p152.target.value);
            }
        };
        const v313 = v307.querySelector("#farmBoostToggle");
        const v314 = v307.querySelector("#farmEvolveToggle");
        const v315 = v307.querySelector("#farmAvoidToggle");
        v313.checked = window.autoFarmBoost;
        v314.checked = window.autoFarmEvolve;
        v315.checked = window.autoFarmAvoidPlayers;
        const v316 = v313.nextElementSibling;
        v316.addEventListener("click", p153 => {
            p153.stopPropagation();
            v313.checked = !v313.checked;
            window.autoFarmBoost = v313.checked;
            f4(v313.checked ? "Farm boost ON" : "Farm boost OFF");
        });
        const v317 = v314.nextElementSibling;
        v317.addEventListener("click", p154 => {
            p154.stopPropagation();
            v314.checked = !v314.checked;
            window.autoFarmEvolve = v314.checked;
            f4(v314.checked ? "Auto evolve ON" : "Auto evolve OFF");
        });
        const v318 = v315.nextElementSibling;
        v318.addEventListener("click", p155 => {
            p155.stopPropagation();
            v315.checked = !v315.checked;
            window.autoFarmAvoidPlayers = v315.checked;
            f4(v315.checked ? "Avoid players ON" : "Avoid players OFF");
        });
        f82(v307);
        return v307;
    }

    function f90() {
        const v319 = document.createElement("div");
        v319.id = "settings-panel";
        v319.className = "ast-panel";
        v319.style.cssText = "top:20px;left:20px;width:220px;";
        v319.innerHTML = "\n      <div class=\"ast-header\"><span class=\"ast-header-title\">Settings</span><button class=\"ast-header-min\" id=\"settingsMin\">−</button></div>\n      <div class=\"ast-body\" id=\"settingsBody\">\n        <div class=\"ast-key-row\"><span>Toggle UI</span><input class=\"ast-key-capture\" id=\"toggleKeyInput\" type=\"text\" value=\"SHIFT\" readonly></div>\n        <div class=\"ast-sep\"></div>\n        <span class=\"ast-section-label\">Background</span>\n        <div class=\"ast-row\"><input class=\"ast-input\" type=\"text\" id=\"bgUrl\" placeholder=\"Image URL...\" style=\"flex:1;\"><button class=\"ast-btn\" id=\"applyBg\" style=\"width:auto;padding:6px 10px;margin:0;\">Set</button></div>\n        <div class=\"ast-sep\"></div>\n        <span class=\"ast-section-label\">Theme</span>\n        <select class=\"ast-select\" id=\"themeSelect\">\n          <option value=\"grey\">Grey</option><option value=\"blue\">Blue</option><option value=\"red\">Red</option>\n          <option value=\"green\">Green</option><option value=\"pink\">Pink</option><option value=\"starwars\">Star Wars</option>\n          <option value=\"kfc\">KFC</option><option value=\"halloween\">Halloween 🔒</option>\n        </select>\n        <div class=\"ast-sep\"></div>\n        <button class=\"ast-btn\" id=\"customThemeToggleBtn\" style=\"display:flex;align-items:center;justify-content:space-between;\">\n          <span style=\"font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-sec,#888);\">Create Theme</span>\n          <span id=\"customThemeArrow\" style=\"color:var(--text-sec,#888);font-size:12px;\">▼</span>\n        </button>\n        <div id=\"customThemeSection\" style=\"display:none;padding-top:4px;\">\n          <input class=\"ast-input\" type=\"text\" id=\"customThemeName\" placeholder=\"Theme name...\" style=\"width:100%;box-sizing:border-box;margin-bottom:4px;\">\n<div class=\"ast-key-row\"><span>Accent</span><input type=\"color\" id=\"ctAcc\" value=\"#888888\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n<div class=\"ast-key-row\"><span>Background</span><input type=\"color\" id=\"ctBg\" value=\"#1a1a1a\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n<div class=\"ast-key-row\"><span>Panel</span><input type=\"color\" id=\"ctPanel\" value=\"#242424\" style=\"width:40px;height:24px;border:1px solid var(--bdr,#333);border-radius:4px;cursor:pointer;padding:0;background:var(--bg2,#242424);\"></div>\n<button class=\"ast-btn\" id=\"saveCustomTheme\" style=\"margin-top:4px;\">Save Theme</button>\n        </div>\n        <div class=\"ast-sep\"></div>\n        <button class=\"ast-btn\" id=\"myThemesToggleBtn\" style=\"display:flex;align-items:center;justify-content:space-between;\">\n          <span style=\"font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--text-sec,#888);\">My Themes</span>\n          <span id=\"myThemesArrow\" style=\"color:var(--text-sec,#888);font-size:12px;\">▼</span>\n        </button>\n        <div id=\"myThemesSection\" style=\"display:none;padding-top:4px;\">\n          <div id=\"customThemeList\"></div>\n          <div id=\"noThemesMsg\" style=\"font-size:11px;color:#555;text-align:center;padding:8px 0;\">No custom themes yet</div>\n        </div>\n      </div>";
        document.body.appendChild(v319);
        const v320 = v319.querySelector("#settingsBody");
        let v321 = false;
        v319.querySelector("#settingsMin").onclick = p156 => {
            p156.stopPropagation();
            v321 = !v321;
            v320.style.display = v321 ? "none" : "block";
            v319.querySelector("#settingsMin").textContent = v321 ? "+" : "−";
        };
        const v322 = v319.querySelector("#toggleKeyInput");
        v322.value = vLSShift.toUpperCase();
        v322.addEventListener("keydown", p157 => {
            p157.preventDefault();
            vLSShift = p157.key;
            v322.value = p157.key.length === 1 ? p157.key.toUpperCase() : p157.key;
        });
        const v323 = v319.querySelector("#bgUrl");
        v323.value = localStorage.getItem("bgUrl") || "";
        v319.querySelector("#applyBg").onclick = () => {
            const v324 = v323.value.trim();
            if (!v324) {
                f4("Enter a URL");
                return;
            }
            localStorage.setItem("bgUrl", v324);
            f84();
            f4("Background applied");
        };
        const v325 = v319.querySelector("#themeSelect");
        const v326 = localStorage.getItem("theme") || "grey";
        const v327 = JSON.parse(localStorage.getItem("customThemes") || "{}");
        const vA8 = ["grey", "blue", "red", "green", "pink", "starwars", "kfc", "halloween"];
        v325.value = vA8.includes(v326) || v327[v326] ? v326 : "grey";
        v325.onchange = p158 => {
            const v328 = p158.target.value;
            if (v328 === "halloween") {
                f81(p159 => {
                    if (p159) {
                        f83("halloween");
                    } else {
                        p158.target.value = localStorage.getItem("theme") || "grey";
                    }
                });
            } else {
                f83(v328);
                f4("Theme: " + v328);
            }
        };
        const vF13 = () => {
            const v329 = v319.querySelector("#customThemeList");
            const v330 = v319.querySelector("#noThemesMsg");
            const v331 = JSON.parse(localStorage.getItem("customThemes") || "{}");
            const v332 = Object.keys(v331);
            v329.innerHTML = "";
            v330.style.display = v332.length === 0 ? "block" : "none";
            v332.forEach(p160 => {
                const v333 = document.createElement("div");
                v333.style.cssText = "display:flex;gap:4px;margin-bottom:3px;";
                const v334 = localStorage.getItem("theme") === p160;
                v333.innerHTML = "\n          <button class=\"ast-btn" + (v334 ? " toggle-on" : "") + "\" style=\"flex:1;margin:0;\">" + p160 + "</button>\n          <button class=\"ast-btn\" style=\"width:32px;margin:0;text-align:center;color:#f44336;\">✕</button>";
                v333.querySelectorAll("button")[0].onclick = () => {
                    f83(p160);
                    f4("Theme: " + p160);
                    vF13();
                };
                v333.querySelectorAll("button")[1].onclick = () => {
                    const v335 = JSON.parse(localStorage.getItem("customThemes") || "{}");
                    delete v335[p160];
                    localStorage.setItem("customThemes", JSON.stringify(v335));
                    if (localStorage.getItem("theme") === p160) {
                        f83("grey");
                        v325.value = "grey";
                        f4("Theme reset to Grey");
                    } else {
                        f4("Deleted: " + p160);
                    }
                    vF13();
                };
                v329.appendChild(v333);
            });
        };
        vF13();
        v319.querySelector("#saveCustomTheme").onclick = () => {
            const v336 = v319.querySelector("#customThemeName").value.trim();
            if (!v336) {
                f4("Enter a theme name");
                return;
            }
            const vA9 = ["grey", "blue", "red", "green", "pink", "starwars", "kfc", "halloween"];
            if (vA9.includes(v336.toLowerCase())) {
                f4("Cannot use built-in theme name");
                return;
            }
            const v337 = v319.querySelector("#ctAcc").value;
            const v338 = v319.querySelector("#ctBg").value;
            const v339 = v319.querySelector("#ctPanel").value;
            const vParseInt = parseInt(v337.slice(1, 3), 16);
            const vParseInt2 = parseInt(v337.slice(3, 5), 16);
            const vParseInt3 = parseInt(v337.slice(5, 7), 16);
            const vF15 = p161 => {
                const v340 = parseInt(p161.slice(1, 3), 16) + 10;
                const v341 = parseInt(p161.slice(3, 5), 16) + 10;
                const v342 = parseInt(p161.slice(5, 7), 16) + 10;
                return "#" + [v340, v341, v342].map(p162 => Math.min(255, p162).toString(16).padStart(2, "0")).join("");
            };
            const vO10 = {
                acc: v337,
                accH: vF15(v337),
                accRGB: vParseInt + "," + vParseInt2 + "," + vParseInt3,
                text: "#e0e0e0",
                textSec: "#888",
                bg1: v338,
                bg2: v339,
                bg3: vF15(v339),
                border: "#333",
                hover: vF15(v339)
            };
            const v343 = JSON.parse(localStorage.getItem("customThemes") || "{}");
            v343[v336] = vO10;
            localStorage.setItem("customThemes", JSON.stringify(v343));
            f83(v336);
            v319.querySelector("#customThemeName").value = "";
            vF13();
            f4("Theme saved: " + v336);
        };
        const v344 = v319.querySelector("#customThemeToggleBtn");
        const v345 = v319.querySelector("#customThemeSection");
        const v346 = v319.querySelector("#customThemeArrow");
        let v347 = false;
        v344.onclick = () => {
            v347 = !v347;
            v345.style.display = v347 ? "block" : "none";
            v346.textContent = v347 ? "▲" : "▼";
        };
        const v348 = v319.querySelector("#myThemesToggleBtn");
        const v349 = v319.querySelector("#myThemesSection");
        const v350 = v319.querySelector("#myThemesArrow");
        let v351 = false;
        v348.onclick = () => {
            v351 = !v351;
            v349.style.display = v351 ? "block" : "none";
            v350.textContent = v351 ? "▲" : "▼";
            if (v351) {
                vF13();
            }
        };
        f82(v319);
        return v319;
    }

    function f91() {
        const v352 = document.createElement("div");
        v352.id = "music-panel";
        v352.className = "ast-panel";
        v352.style.cssText = "bottom:20px;left:510px;width:240px;";
        v352.innerHTML = "\n      <div class=\"ast-header\"><span class=\"ast-header-title\">Music Player</span><button class=\"ast-header-min\" id=\"musicMin\">−</button></div>\n      <div class=\"ast-body\" id=\"musicBody\">\n        <div id=\"musicTrackName\" style=\"font-size:11px;color:var(--acc,#888);text-align:center;padding:4px 2px 8px 2px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\">No tracks</div>\n\n        <div style=\"display:flex;gap:4px;justify-content:center;margin-bottom:8px;flex-wrap:wrap;\">\n          <button class=\"ast-btn\" id=\"musicPrevBtn\" style=\"width:48px;margin:0;text-align:center;padding:6px 4px;\">Prev</button>\n          <button class=\"ast-btn\" id=\"musicPlayBtn\" style=\"width:48px;margin:0;text-align:center;padding:6px 4px;\">Play</button>\n          <button class=\"ast-btn\" id=\"musicStopBtn\" style=\"width:48px;margin:0;text-align:center;padding:6px 4px;\">Stop</button>\n          <button class=\"ast-btn\" id=\"musicNextBtn\" style=\"width:48px;margin:0;text-align:center;padding:6px 4px;\">Next</button>\n        </div>\n\n        <div style=\"display:flex;gap:4px;justify-content:center;margin-bottom:8px;\">\n          <button class=\"ast-btn\" id=\"musicLoopBtn\" style=\"width:70px;margin:0;text-align:center;padding:6px 4px;\">Loop</button>\n          <button class=\"ast-btn\" id=\"musicShuffleBtn\" style=\"width:70px;margin:0;text-align:center;padding:6px 4px;\">Shuffle</button>\n        </div>\n\n        <div class=\"ast-key-row\" style=\"margin-bottom:6px;\">\n          <span>Volume</span>\n          <input type=\"range\" id=\"musicVolume\" min=\"0\" max=\"1\" step=\"0.05\" value=\"0.5\" style=\"width:120px;accent-color:var(--acc,#888);\">\n        </div>\n\n        <div class=\"ast-sep\"></div>\n        <span class=\"ast-section-label\">Add Track</span>\n        <input class=\"ast-input\" type=\"text\" id=\"musicUrlInput\" placeholder=\"Audio or YouTube URL...\" style=\"width:100%;box-sizing:border-box;margin-bottom:4px;\">\n        <input class=\"ast-input\" type=\"text\" id=\"musicNameInput\" placeholder=\"Track name (optional)\" style=\"width:100%;box-sizing:border-box;margin-bottom:4px;\">\n        <button class=\"ast-btn\" id=\"musicAddBtn\">Add Track</button>\n\n        <div class=\"ast-sep\"></div>\n        <span class=\"ast-section-label\">Playlist</span>\n        <div id=\"musicTrackList\" style=\"max-height:150px;overflow-y:auto;\"></div>\n      </div>";
        document.body.appendChild(v352);
        const v353 = v352.querySelector("#musicBody");
        let v354 = false;
        v352.querySelector("#musicMin").onclick = p163 => {
            p163.stopPropagation();
            v354 = !v354;
            v353.style.display = v354 ? "none" : "block";
            v352.querySelector("#musicMin").textContent = v354 ? "+" : "−";
        };
        v352.querySelector("#musicPrevBtn").onclick = () => f25();
        v352.querySelector("#musicStopBtn").onclick = () => f22();
        v352.querySelector("#musicNextBtn").onclick = () => f24();
        const v355 = v352.querySelector("#musicPlayBtn");
        v355.onclick = () => {
            if (!v24.length) {
                f4("Add a track first");
                return;
            }
            if (f23()) {
                f20();
            } else {
                f21();
            }
        };
        const v356 = v352.querySelector("#musicLoopBtn");
        v356.classList.toggle("toggle-on", v25);
        v356.onclick = () => {
            v25 = !v25;
            localStorage.setItem("musicLoop", v25);
            v356.classList.toggle("toggle-on", v25);
            f4(v25 ? "Loop ON" : "Loop OFF");
        };
        const v357 = v352.querySelector("#musicShuffleBtn");
        v357.classList.toggle("toggle-on", v26);
        v357.onclick = () => {
            v26 = !v26;
            localStorage.setItem("musicShuffle", v26);
            v357.classList.toggle("toggle-on", v26);
            f4(v26 ? "Shuffle ON" : "Shuffle OFF");
        };
        const v358 = v352.querySelector("#musicVolume");
        v358.value = vParseFloat;
        v358.oninput = p164 => {
            vParseFloat = parseFloat(p164.target.value);
            localStorage.setItem("musicVolume", vParseFloat);
            if (v23) {
                v23.volume = vParseFloat;
            }
            if (v27) {
                try {
                    v27.setVolume(Math.round(vParseFloat * 100));
                } catch (e27) {}
            }
        };
        v352.querySelector("#musicAddBtn").onclick = () => {
            const v359 = v352.querySelector("#musicUrlInput").value.trim();
            const v360 = v352.querySelector("#musicNameInput").value.trim();
            if (!v359) {
                f4("Enter a URL");
                return;
            }
            v352.querySelector("#musicUrlInput").value = "";
            v352.querySelector("#musicNameInput").value = "";
            f26(v359, v360);
        };
        f28();
        f82(v352);
        return v352;
    }

    function f92() {
        const v361 = document.createElement("div");
        v361.id = "update-history";
        v361.className = "ast-panel";
        v361.style.cssText = "bottom:20px;left:20px;width:230px;max-height:280px;";
        v361.innerHTML = "\n      <div class=\"ast-header\"><span class=\"ast-header-title\">Updates</span><button class=\"ast-header-min\" id=\"updateMin\">−</button></div>\n      <div class=\"ast-body\" id=\"updateBody\" style=\"overflow-y:auto;max-height:220px;\">\n        <ul class=\"ast-update-list\">\n        <li><strong>v1.9</strong> — Fixed ESP not fully working, added music player, and added auto-name (saves locally).</li>\n         <li><strong>v1.8</strong> — Fixed Astra-Vision (Shadows not being Removed), added Custom Themes Feature, fixed enable/disable for sliders, fixed ESP not working properly/gltiched.</li>\n          <li><strong>v1.7</strong> — New Features and Organization.</li>\n        </ul>\n      </div>";
        document.body.appendChild(v361);
        const v362 = v361.querySelector("#updateBody");
        let v363 = false;
        v361.querySelector("#updateMin").onclick = p165 => {
            p165.stopPropagation();
            v363 = !v363;
            v362.style.display = v363 ? "none" : "block";
            v361.querySelector("#updateMin").textContent = v363 ? "+" : "−";
        };
        f82(v361);
        return v361;
    }
    let vLSShift = "Shift";

    function f93() {
        const vA10 = ["deep-tools-panel", "vision-panel", "combat-panel", "automation-panel", "update-history", "settings-panel", "music-panel"];
        const v364 = document.getElementById("deep-tools-panel");
        if (!v364) {
            return;
        }
        const v365 = v364.style.display !== "none";
        vA10.forEach(p166 => {
            const v366 = document.getElementById(p166);
            if (v366) {
                v366.style.display = v365 ? "none" : "block";
            }
        });
    }
    document.addEventListener("keydown", p167 => {
        if (p167.key === vLSShift && !p167.repeat && !p167.target.matches("input,textarea,button,select")) {
            p167.preventDefault();
            f93();
        }
    });
    let v367 = false;

    function f94() {
        if (v367) {
            return;
        }
        v367 = true;
        setTimeout(() => {
            f85();
            f83(localStorage.getItem("theme") || "grey");
            f86();
            f87();
            f88();
            f89();
            f90();
            f92();
            f91();
            f84();
            f5();
            f58();
            f6();
            f59();
            f54();
            v77 = true;
            f45();
            v188 = true;
            f65();
        }, 1000);
    }
    if (document.body) {
        f94();
    } else {
        const v368 = new MutationObserver(() => {
            if (document.body) {
                v368.disconnect();
                f94();
            }
        });
        v368.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    window.addEventListener("load", () => {
        setTimeout(() => {
            vF5();
            f84();
        }, 1000);
        setInterval(() => {
            if (window.__ss?.states) {
                for (const v369 of window.__ss.states) {
                    if (v369?.gameScene?.myAnimals?.length > 0) {
                        v57 = v369.gameScene;
                        v55 = v369.gameScene.game;
                        window.__cachedEM = null;
                        break;
                    }
                }
            }
        }, 2000);
    });
})();
