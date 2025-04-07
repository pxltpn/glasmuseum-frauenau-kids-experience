import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

import { formatDate } from '@/utils/format-date';

const animation = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
};

type DialogPropTypes = {
  currentSlide: {
    _embedded: {
      'wp:featuredmedia': Array<{
        source_url: string;
      }>;
    };
    title: {
      rendered: string;
    };
    acf: {
      'start-date': string;
      'end-date': string;
      content: string;
    };
  };
  onClose: () => void;
};

export const Dialog = ({ currentSlide, onClose }: DialogPropTypes) => {
  return (
    <>
      <motion.div
        animate={{ opacity: 0.8 }}
        {...animation}
        className="fixed bg-[#000] w-full h-[100vh] z-20"
        onClick={onClose}
      ></motion.div>
      <motion.div
        animate={{ opacity: 1 }}
        {...animation}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[80vw] bg-white p-[4vw] rounded-[1vw] flex flex-col gap-[3vw] shadow-lg"
      >
        <div
          className="absolute border-accent border-[0.3vw] rounded-full right-[1.5vw] top-[1.5vw] ring-offset-background transition-opacity hover:opacity-100 focus:outline-none bg-white"
          onClick={onClose}
        >
          <X className="h-[4vw] w-[4vw]" color="#ff6e32" />
          <span className="sr-only">Close</span>
        </div>

        <Image
          className="w-full aspect-4/3 object-cover rounded-[1vw]"
          src={`${currentSlide._embedded['wp:featuredmedia']['0'].source_url}`}
          alt={`${currentSlide.title.rendered}`}
          width={1200}
          height={1200}
        />
        <div className="space-y-[3vw]">
          <div className="text-[3.2vw] leading-[3.2vw]">
            {formatDate(currentSlide.acf['start-date'], 'dd.MM.yy')} –
            {formatDate(currentSlide.acf['end-date'], 'dd.MM.yy')}
          </div>
          <h3
            className="uppercase text-md text-[3.4vw] leading-[4vw] hyphens-auto"
            dangerouslySetInnerHTML={{
              __html: currentSlide.title.rendered,
            }}
          />

          <p className="text-[2vw]">
            {currentSlide.acf['content'].slice(0, 200)}...
          </p>
        </div>
      </motion.div>
    </>
  );
};
