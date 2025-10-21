/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
    colors: {
      // NOTE: App
      app: {
        background: "#0B0E13",
        secondary: "#121721",
        accent: {
          primaryAccent: "#38BDF8",
          secondaryAccent: "#2C95C9",
        },
        text: {
          primary: "#DCE8F5",
          secondary: "#8BA0B3",
        },
      },
      // NOTE: Sidebar
      sidebar: {
        background: "#151B26",
        text: {
          primary: "#E1E9F9",
          inactive: "#7A8CA2",
        },
        activeStage: "#38BDF8",
        hoverState: "#1A212E",
      },
      // NOTE: cardHouse
      cardHouse: {
        background:
          "radial-gradient(125%_125%_at_50%_10%,#0E1219_100%,##111722_100%)",
        scrollbar: "#2C95C9",
        shadowColor: "rgba(56, 189, 248, 0.2)",
      },
      // NOTE: KnowledgeCard
      knlCard: {
        background: "#1C222E",
        border: "#293444",
        text: {
          function: "#38BDF8",
          markdown: "#DDEAF7",
          header: "#56C8F9",
          summary: "#7C8FA5",
        },
        button: "#38BDF8",
        glowColor: "rgba(56, 189, 248, 0.15)",
        linearGradient: "linear-gradient(90deg, #38BDF8, #5ED4FF)",
      },
      // NOTE: CardModal
      modal: {
        backdrop: "rgba(10, 15, 25, 0.85)",
        modal: {
          body: "#161D28",
          outline: "#38BDF8",
        },
        buttons: {
          background: "#38BDF8",
          text: "#0B0E13",
          hovery: "#5ED4FF",
        },
        inputs: {
          background: "#0E141F",
          border: "#293444",
          outline: "#38BDF8",
        },
      },
    },
  },
  plugins: [],
};
