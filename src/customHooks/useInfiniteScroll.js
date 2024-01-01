import { useState, useEffect } from 'react';

const useInfiniteScroll = (event, callback, callback2) => {

  const handleScroll = (e) => {
    const element = e.target;
    if (element) {
      const { scrollTop, clientHeight, scrollHeight } = element;
      if (scrollTop + clientHeight === scrollHeight) {
        callback2();
      }
    }
  };

  useEffect(() => {
    const element = event.target;
    if (element) {

      element.addEventListener('scroll', handleScroll);

      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }
  }, [event]);

  useEffect(() => {
    if (event) {
      callback();
    }
  }, [event]);
};


export default useInfiniteScroll;
