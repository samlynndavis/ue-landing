import React, {useRef} from 'react';
import Image from './Image';
import SanityMuxPlayer from 'sanity-mux-player';

const WorkFullScreenVideoPlayer = ({video, poster}) => {
	const videoRef = useRef();

	if (!video) return null;

	return (
		<div className="image-fill h-screen w-screen">
			{poster?.url && (
				<Image
					alt={poster.alt || 'Eмоте Filмs®'}
					sources={[
						{
							url: poster.url,
							w: 2000,
							media: '(min-width: 1600px)',
						},
						{
							url: poster.url,
							w: 1600,
							media: '(min-width: 1200px)',
						},
						{
							url: poster.url,
							w: 1200,
							media: '(min-width: 800px)',
						},
					]}
					src={{
						url: poster.url,
						w: 1000,
					}}
					lqip={poster.lqip}
					imgProps={{
						className: 'h-full-screen w-screen object-cover',
					}}
					className="h-full-screen w-screen object-cover"
				/>
			)}
			<SanityMuxPlayer
				ref={videoRef}
				poster={false}
				assetDocument={video}
				autoload
				autoplay
				loop
				muted
				showControls={false}
				playsInline
				className="z-3"
			/>
		</div>
	);
};

export default WorkFullScreenVideoPlayer;
