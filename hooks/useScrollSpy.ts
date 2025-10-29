import { useState, useEffect } from 'react';

export const useScrollSpy = (ids: string[], options: { offset: number }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;

      const position = ids
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = rect.top + scroll - options.offset;
          const bottom = rect.bottom + scroll - options.offset;

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => scroll >= top && scroll <= bottom);

      setActiveId(position?.id || '');
    };

    listener();
    window.addEventListener('resize', listener);
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('scroll', listener);
    };
  }, [ids, options.offset]);

  return activeId;
};
