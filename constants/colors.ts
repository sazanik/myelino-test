// common colors
const PRIMARY_TEXT_COLOR = '#FFFFFFF';

// light colors theme
const PRIMARY_TEXT_COLOR_LIGHT = '#292941';
const SECONDARY_TEXT_COLOR_LIGHT = '#292941';
const PLACEHOLDER_TEXT_COLOR_LIGHT = '#888888';
const BACKGROUND_COLOR_LIGHT = '#FFFFFF';
const BRAND_GREEN_COLOR_LIGHT = '#008080';
const PRIMARY_SHADOW_COLOR_LIGHT = '#209090';
const SECONDARY_SHADOW_COLOR_LIGHT = '#000000';

// dark colors theme
const PRIMARY_TEXT_COLOR_DARK = '#FFFFFF';
const SECONDARY_TEXT_COLOR_DARK = '#FFFFFF';
const PLACEHOLDER_TEXT_COLOR_DARK = '#e1e1e1';
const BACKGROUND_COLOR_DARK = '#292941';
const BRAND_GREEN_COLOR_DARK = '#008080';
const PRIMARY_SHADOW_COLOR_DARK = '#209090';
const SECONDARY_SHADOW_COLOR_DARK = '#000000';

export const COLORS = {
  light: {
    common: {
      shadow: {
        primary: PRIMARY_SHADOW_COLOR_LIGHT,
        secondary: SECONDARY_SHADOW_COLOR_LIGHT,
      },
      button: {
        primary: {
          content: PRIMARY_TEXT_COLOR_LIGHT,
          background: BRAND_GREEN_COLOR_LIGHT,
        },
      },
      text: {
        primary: PRIMARY_TEXT_COLOR_LIGHT,
        secondary: SECONDARY_TEXT_COLOR_LIGHT,
        placeholder: PLACEHOLDER_TEXT_COLOR_LIGHT,
      },
      screenBackground: BACKGROUND_COLOR_LIGHT,
      componentBackground: BACKGROUND_COLOR_LIGHT,
    },
    header: {
      backButton: {
        content: 'BACKGROUND_COLOR_LIGHT',
        background: BRAND_GREEN_COLOR_LIGHT,
      },
    },
    filterPanel: {
      item: {
        text: PRIMARY_TEXT_COLOR_LIGHT,
        selectedText: BRAND_GREEN_COLOR_DARK,
      },
    },
    eventList: {
      item: {
        title: PRIMARY_TEXT_COLOR,
        label: {
          content: '#FFFFFFB2',
          background: '#FFFFFF4D',
        },
      },
    },
  },
  dark: {
    common: {
      shadow: {
        primary: PRIMARY_SHADOW_COLOR_DARK,
        secondary: SECONDARY_SHADOW_COLOR_DARK,
      },
      button: {
        primary: {
          content: PRIMARY_TEXT_COLOR_DARK,
          background: BRAND_GREEN_COLOR_LIGHT,
        },
      },
      text: {
        primary: PRIMARY_TEXT_COLOR_DARK,
        secondary: SECONDARY_TEXT_COLOR_DARK,
        placeholder: PLACEHOLDER_TEXT_COLOR_DARK,
      },
      screenBackground: BACKGROUND_COLOR_DARK,
      componentBackground: BACKGROUND_COLOR_DARK,
    },
    header: {
      backButton: {
        content: 'BACKGROUND_COLOR_DARK',
        background: BRAND_GREEN_COLOR_DARK,
      },
    },
    filterPanel: {
      item: {
        text: PRIMARY_TEXT_COLOR_DARK,
        selectedText: BRAND_GREEN_COLOR_DARK,
      },
    },
    eventList: {
      item: {
        title: PRIMARY_TEXT_COLOR,
        label: {
          content: '#FFFFFFB2',
          background: '#FFFFFF4D',
        },
      },
    },
  },
} as const;
