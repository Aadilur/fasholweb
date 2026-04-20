export const SALES_CALENDLY_URL = "https://calendly.com/sakibhossain";
export const TALK_TO_SALES_LABEL = "Talk to sales";

type Props = {
  className?: string;
};

export function TalkToSalesButton({ className }: Props) {
  return (
    <a
      href={SALES_CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`tts-btn ${className ?? ""}`}
    >
      {TALK_TO_SALES_LABEL}
      <span className="tts-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            fill="currentColor"
          />
        </svg>
      </span>
    </a>
  );
}
