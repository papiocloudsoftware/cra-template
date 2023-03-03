import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useCallback } from 'react';

import { ColorPalette } from '../../style/color-palette';
import { StyledButton } from './styled-button';

/**
 * Props to create StyledConfirmation
 */
export interface StyledConfirmationProps {
  readonly title: string | JSX.Element;
  readonly message: string | JSX.Element;
  readonly confirmText?: string;
  readonly onConfirm: () => void;
  readonly cancelText?: string;
  readonly onCancel?: () => void;
}

export function StyledConfirmation(props: StyledConfirmationProps) {
  const { title, message, confirmText, onConfirm, cancelText, onCancel } =
    props;

  const confirmCallback = useCallback(async () => {
    onConfirm();
  }, [onConfirm]);

  return (
    <>
      <DialogTitle sx={{ fontWeight: '600' }}>{title}</DialogTitle>
      <DialogContent
        sx={{
          marginLeft: '1em',
          color: ColorPalette.primaryColorDark,
          textAlign: 'justify',
          lineHeight: '1.4em',
          fontSize: '15px',
        }}
      >
        {message}
      </DialogContent>
      <DialogActions sx={{ marginBottom: '8px', marginRight: '1em' }}>
        <StyledButton
          mode="light"
          onClick={confirmCallback}
          sx={{
            width: '100px',
            ':hover': { borderColor: ColorPalette.primaryColorLight },
          }}
          autoFocus
          showProgressOnClick
        >
          {confirmText || 'OK'}
        </StyledButton>
        {onCancel ? (
          <StyledButton onClick={onCancel} sx={{ width: '100px' }}>
            {cancelText || 'Cancel'}
          </StyledButton>
        ) : undefined}
      </DialogActions>
    </>
  );
}
