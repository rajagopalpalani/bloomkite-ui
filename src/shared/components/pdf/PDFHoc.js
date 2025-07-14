import React from 'react';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FontIcon from '../common/fontAwesomeIcon';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


const PDFHoc = React.memo((props) => {
    const { children, name, icon, loader } = props;
    const loaderComponent = loader || (<span className="download-pdf">Loading document...</span>);
    const downloadIcon = icon || (<span className="download-pdf">
        <FontIcon icon={faFilePdf} className={'pdf-download-icon'} />
        {/* <i className="fa fa-file-pdf-o pdf-download-icon" /> */}
    </span>);
    return (
        <PDFDownloadLink document={children}
            fileName={`${name}_${moment().unix()}.pdf`}>
            {({ loading }) =>
                (loading ? loaderComponent : downloadIcon)}
        </PDFDownloadLink>
    )
}, (prevProps, nextProps) => {
    const { props: prevChildProps } = prevProps.children;
    const { children: prevChild, ...prevPropsWithoutChild } = prevChildProps;
    const { props: nextChildProps } = nextProps.children;
    const { children: nextChild, ...nextPropsWithoutChild } = nextChildProps;
    const prev = JSON.stringify(prevPropsWithoutChild);
    const next = JSON.stringify(nextPropsWithoutChild);
    return prev === next
});

export default PDFHoc;
