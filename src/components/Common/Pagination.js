import {IconsProvider, Pagination, usePagination} from "@aws-amplify/ui-react";
import Button from "components/Buttons";
import {FiArrowLeft} from "react-icons/fi";
import {css} from "twin.macro";
import {ThemeProvider} from "styled-components";
// import {Theme} from "@aws-amplify/ui-react";
// import {useEffect} from "react";

const theme = {
    name: 'pagination-theme',
    tokens: {
        components: {
            pagination: {
                current: {
                    backgroundColor: {value: '{colors.secondary.80}'},
                },
                button: {
                    hover: {
                        backgroundColor: {value: '{colors.neutral.40}'},
                        color: {value: '{colors.secondary.80}'},
                    },
                },
            },
        },
    },
};

export default ({className, currentPage = 1, totalPages = 1, onChange = () => {}}) => {
    const paginationProps = usePagination({currentPage, totalPages});

    // useEffect(() => {
    //     paginationProps.currentPage = currentPage;
    //     paginationProps.totalPages = totalPages;
    // }, [currentPage, totalPages])

    const onChangeCallback = (...data) => {
        paginationProps.onChange.apply(this, data);
        onChange({
            currentPage: data[0]
        })
    }

    const onNextCallback = (...data) => {
        paginationProps.onNext.apply(this, data);
        onChange({
            currentPage: paginationProps.currentPage + 1
        })
    }

    const onPreviousCallback = (...data) => {
        paginationProps.onPrevious.apply(this, data);
        onChange({
            currentPage: paginationProps.currentPage - 1
        })
    }



    return <IconsProvider icons={{
        pagination: {
            next: <Button primary>Next page</Button>,
            previous: <Button AppendIcon={<FiArrowLeft/>} primaryOutline/>,
        },
    }}>
        <ThemeProvider theme={theme} colorMode="light">
            <Pagination css={[styles]} className={className} {...paginationProps} onNext={onNextCallback} onPrevious={onPreviousCallback} onChange={onChangeCallback} />
        </ThemeProvider>
    </IconsProvider>
}

const styles = css`
  button[disabled] {
    opacity: .6;
  }

  li:first-child button.amplify-pagination__item, li:last-child button.amplify-pagination__item  {
    background: transparent !important;
  }

  button.amplify-pagination__item[aria-current="page"] {
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
  }

  button.amplify-pagination__item--current[aria-current="page"] {
    background: var(--color-primary);
    color: var(--color-white-alt);
    border-radius: 16px;
  }
`