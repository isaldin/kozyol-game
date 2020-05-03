import React, { ChangeEvent, PureComponent } from 'react';
import { UIButton } from 'ui-elements/button';
import { UIInput } from 'ui-elements/input';
import { authorIsValid, textIsValid } from 'helpers/quotes/quoteValidation';
import { IQuoteCreateFormProps, IQuoteCreateFormState } from './quoteCreateForm.interface';
import { FormContainer, CloseForm, Box, Title, Label } from './qutesCreateForm.elements';

export class QuoteCreateForm extends PureComponent<IQuoteCreateFormProps, IQuoteCreateFormState> {
    static defaultState: IQuoteCreateFormState = {text: '', author: '', isValid: null};

    state = QuoteCreateForm.defaultState;

    createQuote = () => {
        if (this.state.isValid !== true) {
            return;
        }

        const {text, author} = this.state;

        this.props.onSubmit({text, author});
        this.setState(QuoteCreateForm.defaultState);
    };

    onChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
        this.updateForm({author: event.target.value});
    };

    onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
        this.updateForm({text: event.target.value});
    };

    private updateForm(updateState: Partial<IQuoteCreateFormState>) {
        this.setState({...this.state, ...updateState}, () => this.validate());
    }

    private validate() {
        const {author, text} = this.state;
        const isValid = authorIsValid(author) && textIsValid(text);

        this.setState({isValid});
    }

    render(): React.ReactElement {
        return (
            <FormContainer>
                <Box>
                    <Title>Add quote</Title>
                    <CloseForm onClick={this.props.onClose}>X</CloseForm>
                </Box>
                <Box>
                    <Label>Author:</Label>
                    <UIInput name="author"
                             value={this.state.author}
                             onChange={this.onChangeAuthor}/>
                </Box>
                <Box>
                    <Label>Text:</Label>
                    <UIInput name="text"
                             as="textarea"
                             value={this.state.text}
                             onChange={this.onChangeText}/>
                </Box>
                {this.state.isValid === false
                && <Box error>
                    <p>
                        {`
                        Text and author fields is required.<br />
                        Text length must be >=2 && <=256, author length must be >=2 && <=64
                        `}
                    </p>
                </Box>
                }
                <Box>
                    <UIButton id="create-quote-btn"
                              onClick={this.createQuote}>Create</UIButton>
                </Box>
            </FormContainer>
        );
    }
}
