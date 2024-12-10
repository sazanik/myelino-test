// common colors
const PRIMARY_TEXT_COLOR = '#FFFFFF';

// light colors theme
const PRIMARY_TEXT_COLOR_LIGHT = '#292941';
const SECONDARY_TEXT_COLOR_LIGHT = '#565656';
const BRAND_TEXT_COLOR_LIGHT = '#008080';
const PLACEHOLDER_TEXT_COLOR_LIGHT = '#888888';
const BACKGROUND_COLOR_LIGHT = '#FFFFFF';
const BRAND_GREEN_COLOR_LIGHT = '#008080';
const PRIMARY_SHADOW_COLOR_LIGHT = '#209090';
const SECONDARY_SHADOW_COLOR_LIGHT = '#000000';
const RED_COLOR_LIGHT = '#C8102E';

// dark colors theme
const PRIMARY_TEXT_COLOR_DARK = '#FFFFFF';
const SECONDARY_TEXT_COLOR_DARK = '#ededed';
const BRAND_TEXT_COLOR_DARK = '#008080';
const PLACEHOLDER_TEXT_COLOR_DARK = '#e1e1e1';
const BACKGROUND_COLOR_DARK = '#292941';
const BRAND_GREEN_COLOR_DARK = '#008080';
const PRIMARY_SHADOW_COLOR_DARK = '#209090';
const SECONDARY_SHADOW_COLOR_DARK = '#FFFFFF';
const RED_COLOR_DARK = '#C8102E';

export const COLORS = {
  light: {
    common: {
      modal: {
        overlay: 'rgba(0,0,0,0.5)',
      },
      shadow: {
        primary: PRIMARY_SHADOW_COLOR_LIGHT,
        secondary: SECONDARY_SHADOW_COLOR_LIGHT,
      },
      button: {
        primary: {
          content: PRIMARY_TEXT_COLOR,
          background: BRAND_GREEN_COLOR_LIGHT,
        },
      },
      icon: {
        background: BRAND_GREEN_COLOR_LIGHT,
        content: PRIMARY_TEXT_COLOR,
      },
      text: {
        primary: PRIMARY_TEXT_COLOR_LIGHT,
        secondary: SECONDARY_TEXT_COLOR_LIGHT,
        brand: BRAND_TEXT_COLOR_LIGHT,
        placeholder: PLACEHOLDER_TEXT_COLOR_LIGHT,
      },
      screenBackground: BACKGROUND_COLOR_LIGHT,
      componentBackground: BACKGROUND_COLOR_LIGHT,
    },
    loader: BRAND_GREEN_COLOR_LIGHT,
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
        text: PRIMARY_TEXT_COLOR,
        label: {
          content: '#FFFFFFB2',
          background: '#FFFFFF4D',
        },
      },
    },
    planCard: {
      divider: '#ededed',
      counter: {
        text: PRIMARY_TEXT_COLOR,
      },
      imageBox: {
        border: '#FFFFFF',
      },
    },
    timelineCheckpoint: {
      urgent: {
        text: RED_COLOR_LIGHT,
        background: RED_COLOR_LIGHT,
        border: '#808080',
      },
      plan: {
        text: BRAND_TEXT_COLOR_LIGHT,
        background: BRAND_TEXT_COLOR_LIGHT,
        border: '#808080',
      },
      month: {
        text: PRIMARY_TEXT_COLOR_LIGHT,
        background: PRIMARY_TEXT_COLOR_LIGHT,
        border: '#808080',
      },
      divider: {
        horizontal: '#808080',
        vertical: '#8080812E',
      },
    },
  },
  dark: {
    common: {
      modal: {
        overlay: 'rgba(0,0,0,0.5)',
      },
      shadow: {
        primary: PRIMARY_SHADOW_COLOR_DARK,
        secondary: SECONDARY_SHADOW_COLOR_DARK,
      },
      button: {
        primary: {
          content: PRIMARY_TEXT_COLOR,
          background: BRAND_GREEN_COLOR_LIGHT,
        },
      },
      icon: {
        background: BRAND_GREEN_COLOR_DARK,
        content: PRIMARY_TEXT_COLOR,
      },
      text: {
        primary: PRIMARY_TEXT_COLOR_DARK,
        secondary: SECONDARY_TEXT_COLOR_DARK,
        brand: BRAND_TEXT_COLOR_DARK,
        placeholder: PLACEHOLDER_TEXT_COLOR_DARK,
      },
      screenBackground: BACKGROUND_COLOR_DARK,
      componentBackground: BACKGROUND_COLOR_DARK,
    },
    loader: BRAND_GREEN_COLOR_LIGHT,
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
        text: PRIMARY_TEXT_COLOR,
        label: {
          content: '#FFFFFFB2',
          background: '#FFFFFF4D',
        },
      },
    },
    planCard: {
      divider: '#EDEDED70',
      counter: {
        text: PRIMARY_TEXT_COLOR,
      },
      imageBox: {
        border: '#FFFFFF',
      },
    },
    timelineCheckpoint: {
      urgent: {
        text: RED_COLOR_DARK,
        background: RED_COLOR_DARK,
        border: '#808080',
      },
      plan: {
        text: BRAND_TEXT_COLOR_DARK,
        background: BRAND_TEXT_COLOR_DARK,
        border: '#808080',
      },
      month: {
        text: PRIMARY_TEXT_COLOR_DARK,
        background: PRIMARY_TEXT_COLOR_DARK,
        border: '#808080',
      },
      divider: {
        horizontal: '#808080',
        vertical: '#8080812E',
      },
    },
  },
} as const;
