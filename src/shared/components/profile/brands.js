import React from 'react';

const Brands = (props) => {
    const { list } = props;
    const addZeros = ['00', '0', ''];
    return list && list.length > 0 ? (
        <div className="bloomkite-profile-awards">
            <h5 className="profile-title">
                <strong className="experts-head">Brands</strong>
            </h5>
            <div className="brands brands-icon profile-border padding15 bg-brands">
                {list.map(
                    (item, index) =>
                        index < 5 && (
                            <span key={'p-brand-' + index} className="nomargin brand-name">
                                <img src={`/images/brands/Brand-${addZeros[item.brandId.toString().length - 1]}${item.brandId}.jpg`} />
                            </span>
                        )
                )}
            </div>
        </div>
    ) : null;
};

export default Brands;
