'use client';

import { useExhibitions } from '@/hooks/use-exhibitions';
import { formatDate } from '@/utils/format-date';
import React from 'react';

import { Carousel, CarouselItem } from './ui/carouselv2';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from './ui/dialog';
import Image from 'next/image';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export const Exhibitions = () => {
  const { data, error, isLoading } = useExhibitions();

  // Filter data to only show current exhibitions (based on the acf.start-date field in the form of YYYYMMDD)
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const currentExhibitions = data?.filter((exhibition: any) => {
    const startDate = exhibition.acf['start-date'];
    const endDate = exhibition.acf['end-date'];
    return startDate <= currentDate && currentDate <= endDate;
  });

  // const currentExhibitions = data;

  return (
    <div className="p-[10vw] py-[8vw] space-y-[3vw]">
      <div className="flex items-center justify-between px-[10px]">
        <h2 className="text-[6vw] leading-[7vw] text-[#374040] uppercase">
          News
        </h2>
        <Image
          className="w-[15vw]"
          src="/glasmuseum-logo.svg"
          alt="Logo"
          width={120}
          height={120}
        />
      </div>
      {isLoading ? (
        <p>Ausstellungen werden geladen...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <Carousel>
            {[...currentExhibitions].map((exhibition: any, index) => (
              <CarouselItem key={index}>
                <Dialog>
                  <DialogTrigger className="border-[0.4vw] rounded-[2vw] text-[#374040] p-[2vw] h-full w-full">
                    <div className="flex flex-col gap-[2vw]">
                      <div className="text-[3.2vw] leading-[3.2vw] text-left">
                        {formatDate(exhibition.acf['start-date'], 'dd.MM.yy')} –
                        {formatDate(exhibition.acf['end-date'], 'dd.MM.yy')}
                      </div>
                      <h3
                        className="uppercase text-md text-[3.2vw] leading-[4vw] hyphens-auto text-left"
                        dangerouslySetInnerHTML={{
                          __html: exhibition.title.rendered,
                        }}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <VisuallyHidden asChild>
                      <DialogTitle>Popup für Ausstellung</DialogTitle>
                    </VisuallyHidden>
                    <div className="p-[2vw] space-y-[6vw]">
                      <Image
                        className="w-full aspect-4/3 object-cover"
                        src={`${exhibition._embedded['wp:featuredmedia']['0'].source_url}`}
                        alt={`${exhibition.title.rendered}`}
                        width={1200}
                        height={1200}
                      />
                      <div className="space-y-[3vw]">
                        <div className="text-[3.2vw] leading-[3.2vw]">
                          {formatDate(exhibition.acf['start-date'], 'dd.MM.yy')}{' '}
                          –{formatDate(exhibition.acf['end-date'], 'dd.MM.yy')}
                        </div>
                        <h3
                          className="uppercase text-md text-[3.2vw] leading-[4vw] hyphens-auto"
                          dangerouslySetInnerHTML={{
                            __html: exhibition.title.rendered,
                          }}
                        />

                        <DialogDescription>
                          {exhibition.acf['content'].slice(0, 200)}...
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};
