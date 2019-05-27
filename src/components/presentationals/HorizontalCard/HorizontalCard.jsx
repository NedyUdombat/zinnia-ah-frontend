import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import PopularAuthorItem from '../PopularAuthorItem/PopularAuthorItem';

// components

// styles
import './HorizontalCard.scss';
import Title from '../Title/Title';
import Image from '../Image/Image';

// config
import { DEFAULT_ARTICLE_IMAGE_URL } from '../../../utils/config';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { Card, Icon } from 'semantic-ui-react';

const HorizontalCard = ({ index, article }) => {
  return (
    <div className={`h-card card-${index}`}>
      {article && (
        <Fragment>
          <div>
            <Link to={`/read/${article.slug}`}>
              <Image
                src={article.imageThumbnail || DEFAULT_ARTICLE_IMAGE_URL}
                className="h-card-image"
              />
            </Link>
          </div>
          <div
            className="content"
            style={{
              paddingLeft: '1rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Link
              to={`/read/${article.slug}`}
              style={{ color: '#777', marginBottom: 'auto' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Title className="title-md mb-0" content={article.title} />

                <Button
                  className="btn-transparent"
                  type="button"
                  value={
                    <Icon
                      name="bookmark outline"
                      style={{
                        fontSize: '1.8rem',
                        margin: '0',
                      }}
                    />
                  }
                />
              </div>
              <p
                className="description"
                style={{
                  marginBottom: 'auto',
                }}
              >
                {article.description}
              </p>
            </Link>
            <PopularAuthorItem
              key={'uiojklnmkopiuygh'}
              name={''}
              url={article.author.username}
              image={article.author.image}
              username={article.author.username}
              link={`/read/${article.slug}`}
              value={'Read More'}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default HorizontalCard;

HorizontalCard.propTypes = {
  article: PropTypes.object,
  index: PropTypes.number,
};
