import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Download, FileText } from 'lucide-react';
import { mockPermits } from '@/lib/mockData';
import { Progress } from '@/components/ui/progress';

const workflowSteps = [
  { label: 'Submitted', status: 'completed' },
  { label: 'Document Review', status: 'completed' },
  { label: 'Inspection', status: 'current' },
  { label: 'Approval', status: 'pending' },
  { label: 'Issued', status: 'pending' },
];

export default function Permits() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Permits & Licensing</h1>
        <p className="text-muted-foreground mt-1">Manage permit applications and renewals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">124</div>
            <div className="text-sm text-muted-foreground">Total Permits</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-warning">28</div>
            <div className="text-sm text-muted-foreground">In Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-success">85</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-destructive">11</div>
            <div className="text-sm text-muted-foreground">Expiring Soon</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest permit applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permit ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPermits.map((permit) => (
                    <TableRow key={permit.id}>
                      <TableCell className="font-medium">{permit.id}</TableCell>
                      <TableCell>{permit.citizenName}</TableCell>
                      <TableCell className="capitalize">{permit.type}</TableCell>
                      <TableCell>
                        {permit.status === 'approved' ? (
                          <Badge className="bg-success">Approved</Badge>
                        ) : (
                          <Badge className="bg-accent">In Review</Badge>
                        )}
                      </TableCell>
                      <TableCell>${permit.fee.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Tracker</CardTitle>
            <CardDescription>Application PER002 Status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        step.status === 'completed'
                          ? 'bg-success text-success-foreground'
                          : step.status === 'current'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          step.status === 'completed' ? 'bg-success' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="font-medium">{step.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {step.status === 'completed' ? 'Completed' : step.status === 'current' ? 'In Progress' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span className="font-medium">40%</span>
              </div>
              <Progress value={40} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents & Attachments</CardTitle>
          <CardDescription>Required documents for permit applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Business Plan', 'Tax ID', 'Blueprints', 'Land Deed', 'Insurance', 'Safety Certificate'].map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{doc}</p>
                  <p className="text-xs text-muted-foreground">PDF, 2.4 MB</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
