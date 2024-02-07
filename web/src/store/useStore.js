import create from 'zustand';
import cookie from 'js-cookie';
import isBrowser from '../utils/isBrowser';

import { mountStoreDevtool } from 'simple-zustand-devtools';

export const EMOTE_INTRO_KEY = 'emote_intro';
export const EMOTE_DARK_MODE = 'emote_dark_mode';

export const getInitialState = () => ({
	// UI
	isMobileMenuOpen: false,
	isDarkMode: false,
	hasSeenIntro: false,

	// Projects
	projectsList: [],
});

export const toggleMobileMenu = (set, get) => () => {
	const { isMobileMenuOpen } = get();
	set({ isMobileMenuOpen: !isMobileMenuOpen });
};

export const toggleDarkMode = (set, get) => () => {
	const { isDarkMode } = get();
	cookie.set(EMOTE_DARK_MODE, !isDarkMode, { expires: 21 });
	set({ isDarkMode: !isDarkMode });
};

export const hydrateDarkMode = set => async () => {
	const isDarkMode = cookie.get(EMOTE_DARK_MODE) === 'true';
	set(state => ({ ...state, isDarkMode }));
};

export const hydrateIntro = set => async () => {
	const cachedSavedIntro = cookie.get(EMOTE_INTRO_KEY);

	set(state => ({
		...state,
		hasSeenIntro: cachedSavedIntro === 'true',
	}));
};

export const toggleHasSeenIntro = set => () => {
	cookie.set(EMOTE_INTRO_KEY, true, { expires: 1 });

	set(state => ({
		...state,
		hasSeenIntro: true,
	}));
};

export const setProjects = set => projectsList => set({ projectsList });

export const useStore = create((...args) => ({
	// State
	...getInitialState(...args),

	// Actions
	toggleMobileMenu: toggleMobileMenu(...args),
	toggleDarkMode: toggleDarkMode(...args),
	hydrateDarkMode: hydrateDarkMode(...args),
	hydrateIntro: hydrateIntro(...args),
	toggleHasSeenIntro: toggleHasSeenIntro(...args),
	setProjects: setProjects(...args),
}));

if (process.env.NODE_ENV === 'development') {
	isBrowser && mountStoreDevtool('Universal Element®', useStore);
}
