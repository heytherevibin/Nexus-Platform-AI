import { Fragment } from 'react';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { ChangeAnalysisContent } from './ChangeAnalysisContent';
import { useLayout } from '@/providers';

const ChangeAnalysisPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>Analyze code changes and their impact</ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Import Diff
              </a>
              <a href="#" className="btn btn-sm btn-primary">
                Start Analysis
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <ChangeAnalysisContent />
      </Container>
    </Fragment>
  );
};

export default ChangeAnalysisPage; 