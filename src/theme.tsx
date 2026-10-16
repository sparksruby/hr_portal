import { extendTheme } from '@chakra-ui/react';
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
    fonts: {
        heading: `poppins,'Open Sans',  Pyidaungsu`,
        body: `poppins,'Open Sans', Pyidaungsu`
    },
    colors: {
        button: {
            primary: {
                bg: '',
                color: ''
            }
        },
        input: {
            bg: '#ffffff',
            border: '#dcdcdc',
            radius: '5px',
            hover: {
                bg: '',
                border: '#a4abb3'
            },
            disabled: {
                bg: '#ffffff',
                border: '#dcdcdc'
            }
        },
        brand: {
            primary100: '#28A6DF',
            primary200: '#b6ccd8',
            primary300: '#3b3c3d',
            primaryOpacity42: '#00adee55',
            primaryOpacity15: '#00AEEF26',
            primaryOpacity0A: '#00adee0A',
            primaryOpacity22: '#00adee22',
            primaryOpacity100: '#E9F6FC',
            secondary: '#166296',
            tertiary: '#E7F8FF',
            inputBgColor: '#edf2f7',
            warning: '#FF6230',
            bg100: '#fffefb',
            bg200: '#f5f4f1',
            bg300: '#cccbc8',
            bg400: '#b6b6b6',
            bg500: '#f0f0f0',
            bg900: '#0000000D',
            bg600: '#72767C',
            bg700: '#D9D9D980',
            bg800: '#F3F5F8',

            accent50: '#b7e0f5ff',
            accent100: '#71c4ef',
            accent10050: '#71c4ef50',
            accent200: '#00668c',
            accent300: '#F6FAFF',
            accent400: '#EAF7FD',
            text100: '#1d1c1c',
            text200: '#313d44',
            text300: '#ffffff',
            text400: '#72767C',

            inputcolor: '#fafafa',

            textmuted: '#7c7c7c',
            gray: {
                200: '#BCC2CE',
                300: '#6A6C6F',
                500: '#48494aff'
            },
            green: {
                100: '#009C2C',
                muted: '#28DF5033'
            },
            'navy-blue': {
                100: '#005F9A'
            },

            customRed: {
                100: '#c53569',
                200: '#FF0000',
                300: '#990000',
                20015: '#FF000026'
            },
            customGreen: {
                100: '#49c068'
            }
        }
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 400,
                rounded: '2px'
            },
            variants: {
                primary: {
                    borderRadius: '2px',
                    backgroundColor: '#28A6DF',
                    border: '1px solid #28A6DF',
                    color: 'white'
                },
                danger: {
                    backgroundColor: '#900',
                    color: '#fff'
                }
            }
        }
    },

    textStyles: {
        endorseInput: {
            fontSize: 'sm',
            fontWeight: '500',
            color: 'brand.primary100'
        }
    }
});

export default theme;
