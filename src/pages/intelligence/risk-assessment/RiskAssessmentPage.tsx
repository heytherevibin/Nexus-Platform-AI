import { Fragment } from 'react';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { RiskAssessmentContent } from './RiskAssessmentContent';
import { useLayout } from '@/providers';

const RiskAssessmentPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>Assess risks across your platform</ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-primary">
                Run Assessment
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <RiskAssessmentContent />
      </Container>
    </Fragment>
  );
};

export default RiskAssessmentPage; 