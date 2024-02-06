import React from 'react';
import MuxPlayer from '@mux/mux-player-react';

import useHover from 'buena-suerte/lib/hooks/useHover';

const VideoPlayer = ({poster, className, video, title, thumbnail}) => {
	const [isHovering, hoverProps] = useHover();

	return (
		<div {...hoverProps} className={className}>
			<MuxPlayer
				playbackId={thumbnail?.playbackId || video?.playbackId}
				paused={!isHovering}
				loop
				muted
				poster={poster ? poster : ''}
				metadata={{
					video_title: title,
				}}
				streamType="on-demand"
			/>
		</div>
	);
};

export default VideoPlayer;
