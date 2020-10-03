import React, {Component} from 'react';
import './Movie.css';

class Movie extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section className="inner_content">
                <div id="media_v4" className="media discover">
                    <div className="column_wrapper">
                        <div className="content_wrapper">
                            <div className="title">
                                <h2>Popular Movies</h2>
                            </div>
                            <div className="content">
                                <div>
                                    <div className="filter_panel card">
                                        <div className="name">
                                            <h2>Sort</h2>
                                            <span className="glyphicons_v2 chevron-right"/>
                                        </div>
                                        <div className="filter">
                                            <h3>Sort Results By</h3>
                                            <span title=""
                                                  className="k-widget k-dropdown kendo_dropdown full_width font_size_1"
                                                  unselectable="on" role="listbox" aria-haspopup="true"
                                                  aria-expanded="false" tabIndex="0" aria-owns="sort_by_listbox"
                                                  aria-live="polite" aria-disabled="false" aria-busy="false"
                                                  aria-activedescendant="f0b2cd0c-d03b-4284-b759-24b049b1b4fc"><span
                                                unselectable="on" className="k-dropdown-wrap k-state-default"/><span
                                                unselectable="on" className="k-input"/>Popularity Descending</span><span
                                                unselectable="on" className="k-select" aria-label="select"><span
                                                className="k-icon k-i-arrow-60-down"/></span>><select
                                                id="sort_by" name="sort_by"
                                                className="kendo_dropdown full_width font_size_1"
                                                data-role="dropdownlist" style={{display: "none"}}><option
                                                value="popularity.desc"
                                                selected="selected">Popularity Descending</option><option
                                                value="popularity.asc">Popularity Ascending</option><option
                                                value="vote_average.desc">Rating Descending</option><option
                                                value="vote_average.asc">Rating Ascending</option><option
                                                value="primary_release_date.desc">Release Date Descending</option><option
                                                value="primary_release_date.asc">Release Date Ascending</option><option
                                                value="title.asc">Title (A-Z)</option><option value="title.desc">Title (Z-A)</option></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Movie;