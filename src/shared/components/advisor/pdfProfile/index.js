import React from 'react';
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';
import locationImg from '../../../../images/pin.png';
import degreeImg from '../../../../images/degree.png';
import awardImg from '../../../../images/awards.png';
import buildingImg from '../../../../images/building.png';
import bloomkiteLogo from '../../../../images/color_logo.png';
import PDFHeader from '../../pdf/PDFHeader';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingTop: 50,
        paddingBottom: 70,
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    leftPane: {
        width: '30%',
        backgroundColor: '#fbf2ef',
        borderWidth: 1,
        borderColor: '#fbf2ef',
        borderRadius: 15,
    },
    rightPane: {
        width: '70%',
        marginHorizontal: 10,
    },
    profile: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 40,
        alignSelf: 'center',
    },
    user: {
        alignSelf: 'center',
    },
    bottom8: {
        marginBottom: 8,
    },
    padding: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    paddingHorizontal10: {
        paddingHorizontal: 10,
    },
    textCenter: {
        textAlign: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        objectFit: 'contain'
    },
    fontSize12: {
        fontSize: 12,
    },
    fontSize18: {
        fontSize: 18,
    },
    fontSize15: {
        fontSize: 15,
    },
    expTitle: {
        fontSize: 14,
    },
    top8: {
        marginTop: 8,
    },
    imgText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paddingL20: {
        paddingLeft: 20,
    },
    awardImg: {
        height: 60,
        objectFit: 'contain'
    },
    awardContainer: {
        width: '30%',
        marginRight: 10,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 1,
        borderColor: '#ECECEC',
    },
    footer: {
        position: 'absolute',
        fontSize: 8,
        width: '100%',
        color: '#251534',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center'
    },
    ribbon: {
        borderWidth: 20,
        borderStyle: 'solid',
        borderColor: '#d9d9fa',
        width: '100%',
        position: 'relative'
    },
    ribbonText: {
        fontSize: 14,
        backgroundColor: '#d9d9fa',
        width: '100%'
    },
    service: {
        flexDirection: 'row'
    },
    // wrap: {
    //     flexWrap: 'wrap',
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     alignItems: 'flex-start'
    // },
    // header: {
    //     height: 80,
    //     flexDirection: 'row'
    // },
    // avatar: {
    //     width: 80,
    //     height: 80
    // },
    // user: {
    //     flex: 1,
    //     paddingLeft: 20,
    //     alignSelf: 'center'
    // },
    // username: {
    //     fontSize: 20
    // },
    // designation: {
    //     fontSize: 15,
    //     color: '#8c8c8c'
    // },
    // location: {
    //     fontSize: 13
    // },
    // icon: {
    //     width: 20,
    //     height: 20,
    //     objectFit: 'contain'
    // },
    // title: {
    //     fontWeight: 'bold',
    //     fontSize: 15,
    //     marginBottom: 10
    // },
    // container: {
    //     marginTop: 20,
    //     window: '100%'
    // },
    // promotion: {
    //     flexDirection: 'column',
    //     padding: 10,
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: '#ECECEC',
    //     borderStyle: 'solid',
    //     marginRight: 10,
    //     marginBottom: 10
    // },
    // promotionImage: {
    //     objectFit: 'contain',
    //     width: 150,
    //     height: 150
    // },
    // productTitle: {
    //     fontSize: 14
    // },
    // promotionTitle: {
    //     marginTop: 5
    // },
    // products: {
    //     alignItems: 'baseline',
    //     position: 'relative',
    //     marginBottom: 10
    // },
    // padding: {
    //     paddingLeft: 10,
    //     paddingRight: 10
    // },
    // marginBottom: {
    //     marginBottom: 10
    // },
    // service: {
    //     flexDirection: 'row'
    // },
    // containerSpace: {
    //     marginRight: 10,
    //     paddingLeft: 0,
    //     paddingRight: 0,
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     width: '30%'
    // },
    // experience: {
    //     flexDirection: 'column',
    //     borderWidth: 1,
    //     borderColor: '#ECECEC',
    //     borderStyle: 'solid',
    //     marginBottom: 10
    // },
    // address: {
    //     flexDirection: 'column'
    // },
    // brands: {
    //     flexDirection: 'column',
    //     borderTopWidth: 1,
    //     borderTopStyle: 'solid',
    //     width: '100%'
    // },
    // awardImg: {
    //     height: 60,
    //     marginTop: 10,
    //     objectFit: 'contain'
    // },
    // imgText: {
    //     flexDirection: 'row',
    //     alignItems: 'center'
    // },
    // brand: {},
    // paddingLeft30: {
    //     paddingLeft: 30
    // },
    // width50: {
    //     width: '48%'
    // },
    // logoContainer: {
    //     position: 'absolute',
    //     width: '100%',
    //     top: 20,
    //     // right: 20,
    //     paddingRight: 10,
    //     justifyContent: 'flex-end',
    //     flexDirection: 'row'
    // },
    // footer: {
    //     position: 'absolute',
    //     fontSize: 8,
    //     width: '100%',
    //     color: '#251534',
    //     bottom: 20,
    //     left: 0,
    //     right: 0,
    //     textAlign: 'center'
    // },
    // contact: {},
    // fontSize8: {
    //     fontSize: 8
    // },
    // contactText: {
    //     color: '#251534'
    // },
    // logo: {
    //     width: 100,
    //     height: 17,
    //     alignItems: 'center'
    // }
});

class PdfProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    // renderHeader = () => {
    //     const { profile, profileImage } = this.props;
    //     const { displayName, designation, city } = profile;
    //     return (
    //         <View style={styles.header}>
    //             <Image style={styles.avatar} src={profileImage} />
    //             <View style={styles.user}>
    //                 <Text style={styles.username}>{displayName}</Text>
    //                 <Text style={styles.designation}>{designation}</Text>
    //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                     <Image style={styles.icon} src={locationImg} />
    //                     <Text
    //                         style={{
    //                             ...styles.designation,
    //                             ...styles.location,
    //                             ...styles.fontSize12
    //                         }}>
    //                         {city}
    //                     </Text>
    //                 </View>
    //             </View>
    //         </View>
    //     );
    // };

    renderAboutMe = () => {
        const { profile } = this.props;
        const { aboutme } = profile;
        return (
            <View style={styles.padding}>
                <Text style={{ ...styles.fontSize15, ...styles.bottom8 }}>About Me</Text>
                <Text style={styles.fontSize12}>{aboutme}</Text>
            </View>
        );
    };

    renderExperience = () => {
        const { profile } = this.props;
        const { experiences } = profile;
        if (experiences && experiences.length) {
            return (
                <View style={styles.padding}>
                    <Text style={{ ...styles.fontSize15 }}>Experiences</Text>
                    <View style={styles.wrap}>
                        {experiences.map((experience, i) => {
                            const { company, designation, location, fromYear, toYear } = experience;
                            return (
                                <View key={`experience-${i}`}>
                                    <View style={{ ...styles.imgText, ...styles.top8 }}>
                                        <Image style={styles.icon} src={buildingImg} />
                                        <Text style={{ ...styles.expTitle }}>
                                            {' '}
                                            {company}
                                        </Text>
                                    </View>
                                    <View style={{ ...styles.paddingL20 }}>
                                        <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}>{designation}</Text>
                                        <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}>{location}</Text>
                                        <Text style={{ ...styles.fontSize12 }}>
                                            {fromYear} - {toYear}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderEducation = () => {
        const { profile } = this.props;
        const { educations } = profile;
        if (educations && educations.length) {
            return (
                <View style={styles.padding}>
                    <Text style={{ ...styles.fontSize15 }}>Educations</Text>
                    <View style={styles.wrap}>
                        {educations.map((educations, i) => {
                            const { institution, degree, field, fromYear, toYear } = educations;
                            return (
                                <View
                                    key={`education-${i}`}>
                                    <View
                                        style={{ ...styles.imgText, ...styles.top8 }}>
                                        <Image style={styles.icon} src={degreeImg} />
                                        <Text style={{ ...styles.expTitle }}>
                                            {' '}
                                            {institution}
                                        </Text>
                                    </View>
                                    <View style={{ ...styles.paddingL20 }}>
                                        <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}>{degree}</Text>
                                        {field && <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}> {field}</Text>}
                                        <Text style={{ ...styles.fontSize12 }}>
                                            {fromYear} - {toYear}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderAwards = () => {
        const { profile } = this.props;
        const { awards } = profile;
        if (awards && awards.length) {
            return (
                <View style={styles.padding}>
                    <Text style={{ ...styles.fontSize15, ...styles.bottom8 }}>Awards</Text>
                    <View style={{ ...styles.wrap, flexDirection: 'row' }}>
                        {awards.map((award, i) => {
                            const { title, issuedBy, year, imagePath } = award;
                            return (
                                <View
                                    key={`award-${i}`}
                                    style={{ ...styles.awardContainer }}
                                >
                                    <View style={{ ...styles.imgText, ...styles.top8 }}>
                                        <Image style={styles.icon} src={awardImg} />
                                        <Text style={{ ...styles.expTitle }}>
                                            {' '}
                                            {title}
                                        </Text>
                                    </View>
                                    <View style={{ ...styles.paddingL20 }}>
                                        <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}>{issuedBy}</Text>
                                        <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}>{year}</Text>
                                        {imagePath ? <Image style={{ ...styles.awardImg, ...styles.top8 }} src={imagePath} /> : null}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderCertificates = () => {
        const { profile } = this.props;
        const { certificates } = profile;
        if (certificates && certificates.length) {
            return (
                <View style={styles.padding}>
                    <Text style={{ ...styles.fontSize15, ...styles.bottom8 }}>Certificates</Text>
                    <View style={{ ...styles.wrap, flexDirection: 'row' }}>
                        {certificates.map((certificate, i) => {
                            const { title, issuedBy, year, imagePath } = certificate;
                            return (
                                <View
                                    key={`certificate-${i}`}
                                    style={{ ...styles.awardContainer }}
                                >
                                    <View style={{ ...styles.imgText, ...styles.top8 }}>
                                        <Image style={styles.icon} src={awardImg} />
                                        <Text style={{ ...styles.expTitle }}>
                                            {' '}
                                            {title}
                                        </Text>
                                    </View>
                                    <View style={{ ...styles.paddingL20 }}>
                                        <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}>{issuedBy}</Text>
                                        <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}>{year}</Text>
                                        {imagePath ? <Image style={styles.awardImg} src={imagePath} /> : null}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderKeypeople = () => {
        const { profile } = this.props;
        const { keyPeopleList } = profile;
        if (keyPeopleList && keyPeopleList.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>KeyPeople</Text>
                    <View style={styles.wrap}>
                        {keyPeopleList.map((keyPeople, i) => {
                            const { image, fullName, designation } = keyPeople;
                            const url = image || '/images/avatar.png';
                            return (
                                <View
                                    key={`keypeople-${i}`}
                                    style={{
                                        ...styles.experience,
                                        ...styles.containerSpace
                                    }}>
                                    <View style={{ ...styles.imgText, ...styles.padding }}>
                                        <Text
                                            style={{
                                                ...styles.promotionTitle,
                                                ...styles.productTitle,
                                                ...styles.padding,
                                                ...styles.marginBottom
                                            }}>
                                            {' '}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            ...styles.address,
                                            ...styles.padding
                                        }}>
                                        {image ? <Image style={styles.avatar} src={url} /> : null}
                                        <Text style={{ ...styles.paddingLeft30, ...styles.fontSize12 }}>{fullName}</Text>
                                        <Text style={{ ...styles.paddingLeft30, ...styles.fontSize12 }}>{designation}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderTeam = () => {
        const { profile } = this.props;
        const { teamList } = profile;
        if (teamList && teamList.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Team Member</Text>
                    <View style={styles.wrap}>
                        {teamList.map((teamList, i) => {
                            const { name, phoneNumber, panNumber } = teamList;
                            // const specialization = field && <Text style={{ ...styles.paddingLeft30, ...styles.fontSize12 }}>{field}</Text>;
                            return (
                                <View
                                    key={`team-member-${i}`}
                                    style={{
                                        ...styles.experience,
                                        ...styles.containerSpace
                                    }}>
                                    <View style={{ ...styles.imgText, ...styles.padding }}>
                                        <Text
                                            style={{
                                                ...styles.promotionTitle,
                                                ...styles.productTitle,
                                                ...styles.padding,
                                                ...styles.marginBottom
                                            }}>
                                            {' '}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            ...styles.address,
                                            ...styles.padding
                                        }}>
                                        <Text style={{ ...styles.paddingLeft30, ...styles.fontSize12 }}>{name}</Text>
                                        <Text style={{ ...styles.paddingLeft30, ...styles.fontSize12 }}>{phoneNumber}</Text>
                                        <Text style={{ ...styles.paddingLeft30, ...styles.fontSize12 }}>{panNumber}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderProducts = () => {
        const { profile, productList, serviceList, remunerationList } = this.props;
        const { advProducts, advBrandRank } = profile;
        if (advProducts && advProducts.length) {
            return (
                <View style={styles.padding}>
                    <Text style={{ ...styles.fontSize15, ...styles.bottom8 }}>Products</Text>
                    <View style={{ ...styles.wrap, flexDirection: 'row' }}>
                        {advProducts.map((item, i) => {
                            const { prodId, remId, serviceId } = item;
                            const serviceIdList = (serviceId || '').split(',');
                            const product = productList[prodId] || {};
                            const remun = remunerationList[remId] || {};
                            // const brandList = advBrandRank && advBrandRank.filter((item) => prodId === item.prodId);
                            return (
                                <View
                                    key={`product-${i}`}
                                    style={{ ...styles.awardContainer, width: '50%' }}>
                                    <Text style={{
                                        ...styles.fontSize18,
                                        ...styles.bottom8,
                                        ...styles.paddingHorizontal10,
                                        ...styles.top8,
                                    }}>
                                        {product.product}
                                    </Text>
                                    {remun.remuneration && (
                                        <View style={{ ...styles.ribbon }}>
                                            <Text style={{ ...styles.ribbonText }}>{remun.remuneration}</Text>
                                        </View>
                                    )}
                                    {serviceIdList &&
                                        serviceIdList.map((service, i) => {
                                            const serviceName = serviceList[service] || {};
                                            return serviceName ? (
                                                <View
                                                    style={{
                                                        ...styles.service,
                                                        ...styles.fontSize12,
                                                        ...styles.bottom8,
                                                        ...styles.top8,
                                                        ...styles.paddingHorizontal10,
                                                    }}
                                                    key={`service-${i}`}>
                                                    <Text>-</Text>
                                                    <Text
                                                        style={{
                                                            ...styles.service,
                                                            ...styles.fontSize12,
                                                            paddingLeft: 5,
                                                        }}>
                                                        {serviceName.service}
                                                    </Text>
                                                </View>
                                            ) : null;
                                        })}
                                    {/* {brandList && brandList.length > 0 && (
                                        <View style={{ ...styles.brands }}>
                                            <Text style={{
                                                ...styles.padding,
                                                ...styles.promotionTitle,
                                                ...styles.marginBottom,
                                            }}>Brands</Text>
                                            {brandList && brandList.map((brand, i) => {
                                                return (
                                                    <Text
                                                        style={{
                                                            ...styles.brand,
                                                            ...styles.padding,
                                                            ...styles.marginBottom,
                                                            ...styles.fontSize12,
                                                        }}
                                                        key={`brands-${i}`}
                                                    >{brand.brand}</Text>);
                                            })}
                                        </View>
                                    )} */}
                                </View>
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderBrands = () => {
        const { profile } = this.props;
        const { advProducts, advBrandRank } = profile;
        if (advProducts && advProducts.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Brands</Text>
                    <View wrap style={styles.wrap}>
                        {advProducts.map((item, i) => {
                            const { prodId } = item;
                            const brandList = advBrandRank && advBrandRank.filter((item) => prodId === item.prodId);
                            return (
                                brandList &&
                                brandList.length > 0 && (
                                    <View
                                        style={{
                                            ...styles.promotion,
                                            ...styles.products,
                                            ...styles.containerSpace,
                                            ...styles.width50
                                        }}
                                        key={`brands-${i}`}>
                                        {brandList.map((brand, j) => {
                                            return (
                                                <View
                                                    style={{
                                                        ...styles.padding,
                                                        ...styles.service,
                                                        ...styles.marginBottom,
                                                        ...styles.fontSize12
                                                    }}
                                                    key={`brands-${i}-${j}`}>
                                                    <Text>-</Text>
                                                    <Text
                                                        style={{
                                                            ...styles.brand,
                                                            ...styles.padding,
                                                            ...styles.marginBottom,
                                                            ...styles.fontSize12
                                                        }}>
                                                        {brand.brand}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                )
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderPromotions = () => {
        const { profile } = this.props;
        const { promotions } = profile;
        if (promotions && promotions.length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Promotions</Text>
                    <View style={styles.wrap}>
                        {promotions.map((item, i) => {
                            const { title, imagePath } = item;
                            return (
                                <View
                                    // minPresenceAhead={1}
                                    key={`promotion-${i}`}
                                    style={styles.promotion}>
                                    {imagePath && <Image style={styles.promotionImage} src={imagePath} />}
                                    <Text style={{ ...styles.promotionTitle, ...styles.fontSize12 }}>{title}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            );
        }
        return null;
    };

    renderFooter = () => {
        return (
            <View fixed style={styles.footer}>
                <Text>Generated by Bloomkite, {moment().format('YYYY')}</Text>
            </View>
        );
    };

    renderLogo = () => {
        return (
            <View fixed style={styles.logoContainer}>
                <Image src={bloomkiteLogo} style={styles.logo} />
                {/* <View style={styles.contact}>
                    <Text style={{ ...styles.fontSize8 }}>Contact us</Text>
                    <Text style={{ ...styles.fontSize8, ...styles.contactText }}>info@bloomkite.com</Text>
                </View> */}
            </View>
        );
    };

    renderLeftPane = () => {
        return (
            <View style={styles.leftPane}>
                {this.renderProfile()}
                {this.renderExperience()}
                {this.renderEducation()}
            </View>
        )
    }

    renderProfile = () => {
        const { profile, profileImage } = this.props;
        const { displayName, designation, city } = profile;
        return (
            <View style={{ ...styles.profile, ...styles.padding }}>
                <Image style={{ ...styles.avatar, ...styles.bottom8 }} src={profileImage} />
                <View style={{ ...styles.user }}>
                    <Text style={{ ...styles.fontSize18, ...styles.bottom8 }}>{displayName}</Text>
                    <Text style={{ ...styles.fontSize12, ...styles.bottom8 }}>{designation}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={styles.icon} src={locationImg} />
                        <Text style={styles.fontSize12}>{city}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderRightPane = () => {
        return (
            <View style={styles.rightPane}>
                {this.renderAboutMe()}
                {this.renderAwards()}
                {this.renderCertificates()}
            </View>
        )
    }

    render() {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <PDFHeader />
                    <View style={styles.container}>
                        {this.renderLeftPane()}
                        {this.renderRightPane()}
                    </View>
                    {this.renderFooter()}
                    {/* {this.renderLogo()}
                    {this.renderHeader()}
                    {this.renderAboutMe()}
                    {this.renderProducts()}
                    {this.renderBrands()}
                    {this.renderTeam()}
                    {this.renderExperience()}
                    {this.renderEducation()}
                    {this.renderAwards()}
                    {this.renderCertificates()}
                    {this.renderKeypeople()}
                    {this.renderPromotions()}
                    {this.renderFooter()} */}
                </Page>
                <Page size="A4" style={styles.page}>
                    <PDFHeader />
                    {this.renderProducts()}
                    {this.renderFooter()}
                </Page>
            </Document>
        );
    }
}

export default PdfProfile;
