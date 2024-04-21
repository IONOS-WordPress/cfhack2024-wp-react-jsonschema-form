import { select, dispatch } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';

setTimeout(
	() => {

    dispatch('core/blocks').addBlockTypes(
      select('core/blocks')
        .getBlockTypes()
        .map(t => ({
            ...t,
            attributes: Object
              .keys(t.attributes)
              .reduce(
                (as, a) => {
                  const {source, selector, attribute, ...rest} = t.attributes[a];
                  as[a] = rest;
                  return as
                },
                {}
              )
          })
        )
    );

  },
  800
);
