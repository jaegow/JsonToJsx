import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { loadNavConfig } from '../store/actions/navActions';
import { loadUserConfig } from '../store/actions/userActions';
import Scroll from '../modules/Scroll';
import { buildLoggers } from '../utils/log';
import './Navigation.scss';

const { log } = buildLoggers('Navigation');

const selectCleanConfig = createSelector(
  (state) => state.Nav.config,
  (config) => config && config.map((item) => {
    const hasSubNav = item.items && item.items.length;
    if (!hasSubNav) return item;
    // the config must be proprietary to another frame work
    // the actual config for this lives in the first item
    const { items = [], text } = item.items[0];
    return {
      ...item,
      items,
      title: text,
    };
  }),
);

/**
 * Navigation Component
 * listens to scroll events
 *
 * @version 0.0.1
 * @author [Justin Gow](https://github.com/jaegow)
 */
const Navigation = () => {
  // const user_config = useSelector((state) => state.User.config);
  const nav_config = useSelector(selectCleanConfig);
  const dispatch = useDispatch();

  log('render', { nav_config });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    dispatch(loadNavConfig());
    dispatch(loadUserConfig());
    //
    const scroll_subscription = Scroll.observable$.subscribe(({ scrollX, scrollY }) => {
      log('useEffect', 'Scroll.scroll$', { scrollX, scrollY });
    });

    // Similar to componentWillUnmount
    return () => scroll_subscription.unsubscribe();
  });


  if (!nav_config || !nav_config.length) return false;

  return (
    <nav className="nav">
      <ul className="nav__tier1">
        {
          // eslint-disable-next-line no-unused-vars
          nav_config.map(({ text, url, title, icon, items, megamenuID }) => (
            <li key={megamenuID} role="menuitem">
              <a href={url} className="nav__link--tier1">{text}</a>
              {
                items && items.length && (
                  <ul className="nav__tier2">
                    <p className="nav__title">{title}</p>
                    {
                      items.map((item) => (
                        <li key={item.megamenuID} role="menuitem">
                          <a className="nav__link--tier2" href={item.url}>{item.text}</a>
                        </li>
                      ))
                    }
                  </ul>
                )
              }
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Navigation;
