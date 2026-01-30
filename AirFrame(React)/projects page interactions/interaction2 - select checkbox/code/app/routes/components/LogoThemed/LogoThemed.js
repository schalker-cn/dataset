import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '../../../components/Theme';

const PLACEHOLDER_URL = "https://dummyimage.com/100x20/0606fc/0606fc&text=1";

const logos = {
    white: PLACEHOLDER_URL,
    primary: PLACEHOLDER_URL,
    success: PLACEHOLDER_URL,
    warning: PLACEHOLDER_URL,
    danger: PLACEHOLDER_URL,
    info: PLACEHOLDER_URL,
    indigo: PLACEHOLDER_URL,
    purple: PLACEHOLDER_URL,
    pink: PLACEHOLDER_URL,
    yellow: PLACEHOLDER_URL,
    blue: PLACEHOLDER_URL
};

const getLogoUrl = (style, color) => {
    return logos[color];
}

// Check for background
const getLogoUrlBackground = (style, color) => {
    if (style === 'color') {
        return logos['blue'];
    } else {
        return getLogoUrl(style, color);
    }
}

const LogoThemed = ({ checkBackground, className, ...otherProps }) => (
    <ThemeConsumer>
    {
        ({ style, color }) => (
            <img
                src={
                    checkBackground ?
                        getLogoUrlBackground(style, color) :
                        getLogoUrl(style, color)
                }
                className={ classNames('d-block', className) }
                alt="Airframe Logo"
                { ...otherProps }
            />
        )
    }
    </ThemeConsumer>
);
LogoThemed.propTypes = {
    checkBackground: PropTypes.bool,
    className: PropTypes.string,
};

export { LogoThemed };
