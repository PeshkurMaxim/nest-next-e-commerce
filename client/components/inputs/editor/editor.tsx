import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

interface ListProps {
    value: string,
    name: string,
    onChange: Function, 
}

export default function Editor({ value, onChange, name}: ListProps) {
    const handleChange = (content: string) => {
        if (content != value)
            onChange({ target : { value: content, name }});
    }

    return (
        <QuillNoSSRWrapper className='max-w-4xl' modules={modules} formats={formats} theme="snow" value={value} onChange={handleChange} />
    );
}