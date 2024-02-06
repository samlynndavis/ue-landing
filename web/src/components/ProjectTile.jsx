import React from 'react';
import dynamic from 'next/dynamic';
import Link from './Link';
import Image from './Image';

const VideoPlayer = dynamic(() => import('./ProjectTileVideoPlayer'));

const ProjectTile = ({title, slug, video, thumbnail, cover}) => (
	<Link title={title} url={`/work/${slug}`} className="w-full h-full block">
		<div className="flex flex-col gap-15">
			<div className="rounded-6 aspect-video">
				{cover?.url && (
					<Image
						alt={title}
						src={{
							url: cover.url,
							w: 700,
						}}
						lqip={cover.lqip}
						imgProps={{
							className: 'rounded-6 w-full h-full object-cover',
						}}
						className="rounded-6 h-full w-full object-cover transition-opacity duration-1000"
					/>
				)}

				<VideoPlayer
					poster={cover.url}
					video={video}
					thumbnail={thumbnail}
					title={title}
					className="rounded-6 overflow-hidden z-3 image-fill h-0 pt-[56.5%] hide-controls"
				/>
			</div>
			<p className="text-14 text-center">{title}</p>
		</div>
	</Link>
);

export default ProjectTile;
