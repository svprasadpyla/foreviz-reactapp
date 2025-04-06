import React from 'react';
import ReactContentLoader from 'react-content-loader';
import PropTypes from "prop-types";

const ContentLoader = ({ lines = 5, viewBoxHeight, lineHeight = 20 }) => {
    const initialYOffset = 18
    const gapBetweenLines = 3
    let y = initialYOffset
    const lineGenerator = () => {
        const generatedLines = []
        for (let i = 1; i <= lines; i++) {
            generatedLines.push(<rect x="0" y={y} rx="4" ry="4" width="380" height={lineHeight} />)
            y += lineHeight + gapBetweenLines
        }
        return generatedLines
    }

    const maxViewBoxHeight = 200

    const calulatedHeight = initialYOffset + (lines * (lineHeight + gapBetweenLines)) - gapBetweenLines

    viewBoxHeight = viewBoxHeight || Math.min(calulatedHeight, maxViewBoxHeight)
    return (
        <ReactContentLoader
            speed={1}
            viewBox={`0 18 380 ${viewBoxHeight}`}>
            {lineGenerator()}
        </ReactContentLoader>
    );
};
ContentLoader.propTypes = {
    lines: PropTypes.number,
    lineHeight: PropTypes.number,
    viewBoxHeight: PropTypes.number,
};
export default ContentLoader;