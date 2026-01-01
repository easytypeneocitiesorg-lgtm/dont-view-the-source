(() => {
  /* ======================
     MEMORY (LOCAL ONLY)
  ====================== */
  const now = Date.now();
  const visits = Number(localStorage.getItem("v") || 0) + 1;
  localStorage.setItem("v", visits);

  const last = Number(localStorage.getItem("last") || now);
  localStorage.setItem("last", now);

  const dwell = Math.round((now - last) / 1000);

  const devCount = Number(localStorage.getItem("dev") || 0);

  /* ======================
     DEVTOOLS DETECTION
  ====================== */
  let tripped = false;

  const devLines = [
    "I see you are snooping around.",
    "Not very professional.",
    "You don't like to play fair.",
    "Most people would have left by now.",
    "You came back prepared this time.",
    "You always check the console first.",
    "Curiosity is a tell."
  ];

  function personalLine() {
    const hour = new Date().getHours();
    const ua = navigator.userAgent.toLowerCase();

    if (visits > 4 && devCount > 2)
      return "You keep opening this. Habit, or desperation?";

    if (hour < 5)
      return "You're up late. That usually means obsession.";

    if (ua.includes("edg"))
      return "Edge user. You hesitate, then commit.";

    if (ua.includes("chrome"))
      return "Chrome again. Predictable.";

    return devLines[Math.floor(Math.random() * devLines.length)];
  }

  setInterval(() => {
    if (
      window.outerWidth - window.innerWidth > 160 ||
      window.outerHeight - window.innerHeight > 160
    ) {
      if (!tripped) {
        tripped = true;
        localStorage.setItem("dev", devCount + 1);

        console.clear();
        console.log(
          "%c" + personalLine(),
          "color:#999; font-style:italic"
        );
      }
    }
  }, 500);

  /* ======================
     MORSE PAYLOAD
  ====================== */
  const morse = `
-- -.-- -.-- --- ..- .- .-. . -. --- - . -. - .. - .-.. . -.. - --- .-- .. -. 
--- -. .-.. -.-- .--. . .-. ... .. ... - . -. -.-. . . .- .-. -. ... 
.--. . .-. -- .. ... ... .. --- -.
  `.trim();

  /* ======================
     INTENTIONAL RELEASE
  ====================== */
  setTimeout(() => {
    console.clear();

    if (visits > 1) {
      console.log(
        "%cYou remembered this place.",
        "color:#666"
      );
    }

    if (dwell > 10) {
      console.log(
        "%cYou waited.",
        "color:#666"
      );
    }

    console.log("%cRecovered fragment:", "color:#777");
    console.log(morse);
  }, 900);
})();
