import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset/iron-iconset.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-icon-button/paper-icon-button';

import view from './shell.template.html';
import style from './shell.style.scss';
import '../icons';
// Have to include the shared styles here even if they're not directly used
// so that they're bundled within the app.js and not within each dynamic view
import '../shared-styles';

export class MyApp extends PolymerElement {
  $: any;
  page: any;

  static get is() {
    return 'my-app';
  }

  static get template() {
    return html([`<style>${style}</style>${view}`]);
  }

  static get properties() {
    return {
      totalNo: {
        type: Number,
        value: 5
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      // This shouldn't be necessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String
    };
  }

  static get observers() {
    return ['_routePageChanged(routeData.page)'];
  }

  _routePageChanged(page: string) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'view1' in that case.
    this.page = page || 'view1';
  }

  _pageChanged(page: string) {
    // Load page import on demand. Show 404 page if fails
    import(/* webpackMode: "lazy" */
    `../${page}/${page}.component`).catch(this._showPage404.bind(this));
  }

  _showPage404() {
    this.page = 'view404';
  }

  _renderStars(starsCount: Number) {
    const starCountArray = [];
    for (var i = 0; i < starsCount; ++i) {
      starCountArray.push(i);
    }

    return starCountArray;
  }

  _renderScoreBubbleColour(score: Number) {
    let iconType = '';
    switch (true) {
      case score < 68:
        iconType = 'poor';
        break;
      case score < 75:
        iconType = 'fair';
        break;
      case score <= 100:
        iconType = 'good';
        break;
    }

    return iconType;
  }

  _renderScoreSummary(score: Number) {
    let scoreSummary = '';
    switch (true) {
      case score < 68:
        scoreSummary = 'Poor';
        break;
      case score < 75:
        scoreSummary = 'Fair';
        break;
      case score < 80:
        scoreSummary = 'Good';
        break;
      case score < 86:
        scoreSummary = 'Very Good';
        break;
      case score <= 100:
        scoreSummary = 'Excellent';
        break;
    }

    return scoreSummary;
  }

  _roundUpDistance(distance: Number) {
    return distance.toFixed(2);
  }

  _checkReviewsCountDefined(reviewsCount: Number) {
    if (!reviewsCount) {
      return 0;
    } else {
      return reviewsCount;
    }
  }
}
